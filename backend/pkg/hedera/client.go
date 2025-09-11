package hedera

import (
	"crypto/aes"
	"crypto/cipher"
	"crypto/rand"
	"encoding/hex"
	"errors"
	"fmt"
	"io"
	"os"

	hsdk "github.com/hashgraph/hedera-sdk-go/v2"
)

type Service struct {
	client        *hsdk.Client
	operatorID    hsdk.AccountID
	operatorKey   hsdk.PrivateKey
	encryptionKey []byte
}

type Account struct {
	AccountID  hsdk.AccountID
	PublicKey  hsdk.PublicKey
	PrivateKey hsdk.PrivateKey
}

func NewService() (*Service, error) {
	opID := os.Getenv("HEDERA_ACCOUNT_ID")
	opKey := os.Getenv("HEDERA_PRIVATE_KEY")
	network := os.Getenv("HEDERA_NETWORK")
	encKey := os.Getenv("HEDERA_ENCRYPTION_KEY")
	if opID == "" || opKey == "" {
		return nil, errors.New("HEDERA_ACCOUNT_ID and HEDERA_PRIVATE_KEY must be set")
	}
	accID, err := hsdk.AccountIDFromString(opID)
	if err != nil {
		return nil, fmt.Errorf("invalid HEDERA_ACCOUNT_ID: %w", err)
	}
	priv, err := hsdk.PrivateKeyFromString(opKey)
	if err != nil {
		return nil, fmt.Errorf("invalid HEDERA_PRIVATE_KEY: %w", err)
	}
	var c *hsdk.Client
	switch network {
	case "mainnet":
		c = hsdk.ClientForMainnet()
	case "previewnet":
		c = hsdk.ClientForPreviewnet()
	default:
		c = hsdk.ClientForTestnet()
	}
	c.SetOperator(accID, priv)
	var key []byte
	if encKey != "" {
		b, err := hex.DecodeString(encKey)
		if err != nil {
			return nil, fmt.Errorf("invalid HEDERA_ENCRYPTION_KEY: %w", err)
		}
		key = b
	} else {
		b := make([]byte, 32)
		if _, err := rand.Read(b); err != nil {
			return nil, err
		}
		key = b
	}
	return &Service{client: c, operatorID: accID, operatorKey: priv, encryptionKey: key}, nil
}

func (s *Service) CreateAccount(initialHBAR float64) (*Account, error) {
	priv, err := hsdk.PrivateKeyGenerateEd25519()
	if err != nil {
		return nil, err
	}
	pub := priv.PublicKey()
	amount := hsdk.HbarFromTinybar(int64(initialHBAR * 100000000))
	resp, err := hsdk.NewAccountCreateTransaction().
		SetKey(pub).
		SetInitialBalance(amount).
		Execute(s.client)
	if err != nil {
		return nil, err
	}
	rec, err := resp.GetReceipt(s.client)
	if err != nil {
		return nil, err
	}
	return &Account{AccountID: *rec.AccountID, PublicKey: pub, PrivateKey: priv}, nil
}

func (s *Service) EncryptPrivateKey(pk hsdk.PrivateKey) (string, error) {
	data := pk.Bytes()
	block, err := aes.NewCipher(s.encryptionKey)
	if err != nil {
		return "", err
	}
	gcm, err := cipher.NewGCM(block)
	if err != nil {
		return "", err
	}
	nonce := make([]byte, gcm.NonceSize())
	if _, err := io.ReadFull(rand.Reader, nonce); err != nil {
		return "", err
	}
	ct := gcm.Seal(nonce, nonce, data, nil)
	return hex.EncodeToString(ct), nil
}

func (s *Service) DecryptPrivateKey(enc string) (hsdk.PrivateKey, error) {
	ct, err := hex.DecodeString(enc)
	if err != nil {
		return hsdk.PrivateKey{}, err
	}
	block, err := aes.NewCipher(s.encryptionKey)
	if err != nil {
		return hsdk.PrivateKey{}, err
	}
	gcm, err := cipher.NewGCM(block)
	if err != nil {
		return hsdk.PrivateKey{}, err
	}
	ns := gcm.NonceSize()
	if len(ct) < ns {
		return hsdk.PrivateKey{}, errors.New("ciphertext too short")
	}
	nonce, body := ct[:ns], ct[ns:]
	pt, err := gcm.Open(nil, nonce, body, nil)
	if err != nil {
		return hsdk.PrivateKey{}, err
	}
	return hsdk.PrivateKeyFromBytes(pt)
}

func (s *Service) GetBalance(id hsdk.AccountID) (float64, error) {
	b, err := hsdk.NewAccountBalanceQuery().SetAccountID(id).Execute(s.client)
	if err != nil {
		return 0, err
	}
	return float64(b.Hbars.AsTinybar()) / 100000000, nil
}

func (s *Service) TransferHbar(fromAcc, toAcc hsdk.AccountID, amount float64, fromKey hsdk.PrivateKey, memo string) (string, error) {
	h := hsdk.HbarFromTinybar(int64(amount * 100000000))
	tx := hsdk.NewTransferTransaction().
		AddHbarTransfer(fromAcc, h.Negated()).
		AddHbarTransfer(toAcc, h)
	if memo != "" {
		tx.SetTransactionMemo(memo)
	}
	frozen, err := tx.FreezeWith(s.client)
	if err != nil {
		return "", err
	}
	resp, err := frozen.Sign(fromKey).Execute(s.client)
	if err != nil {
		return "", err
	}
	rec, err := resp.GetReceipt(s.client)
	if err != nil {
		return "", err
	}
	return rec.TransactionID.String(), nil
}

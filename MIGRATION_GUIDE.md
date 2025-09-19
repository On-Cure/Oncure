# Database Migration Guide: SQLite to PostgreSQL

This guide explains how to migrate your onCare application from SQLite to PostgreSQL for production deployment on Render.

## Why Migrate to PostgreSQL?

- **Persistence**: Render's ephemeral filesystem doesn't persist SQLite files between deployments
- **Scalability**: PostgreSQL handles concurrent connections better
- **Production Ready**: PostgreSQL is designed for production workloads
- **Render Integration**: Native PostgreSQL service with automatic backups

## Migration Steps

### 1. Create PostgreSQL Database on Render

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New" → "PostgreSQL"
3. Configure your database:
   - Name: `oncare-db`
   - Database: `oncare`
   - User: `oncare_user`
4. Note the `DATABASE_URL` provided

### 2. Update Environment Variables

Set these environment variables in your Render backend service:

```env
DATABASE_URL=<your-render-postgres-url>
MIGRATIONS_PATH=file://pkg/db/migrations/postgres
JWT_SECRET=<your-secret-key>
UPLOAD_PATH=./uploads
```

### 3. Deploy Backend

The application will automatically:
- Detect PostgreSQL via `DATABASE_URL`
- Run PostgreSQL migrations
- Create all necessary tables

### 4. Data Migration (If Needed)

If you have existing SQLite data to migrate:

1. **Export SQLite Data**:
   ```bash
   sqlite3 backend/soshi.db .dump > data_export.sql
   ```

2. **Convert to PostgreSQL Format**:
   - Replace `INTEGER PRIMARY KEY AUTOINCREMENT` with `SERIAL PRIMARY KEY`
   - Replace `TEXT` with appropriate `VARCHAR(n)` where needed
   - Replace `BOOLEAN DEFAULT 0` with `BOOLEAN DEFAULT FALSE`

3. **Import to PostgreSQL**:
   ```bash
   psql $DATABASE_URL < converted_data.sql
   ```

## Code Changes Made

### New Files Created:
- `backend/pkg/db/postgres/postgres.go` - PostgreSQL database package
- `backend/pkg/db/migrations/postgres/*.sql` - PostgreSQL migration files
- `backend/pkg/db/db.go` - Unified database interface

### Modified Files:
- `backend/go.mod` - Added PostgreSQL driver
- `backend/server.go` - Updated to use unified database interface
- `backend/.env.example` - Added PostgreSQL configuration examples

## Key Differences: SQLite vs PostgreSQL

| Feature | SQLite | PostgreSQL |
|---------|--------|------------|
| Primary Key | `INTEGER PRIMARY KEY AUTOINCREMENT` | `SERIAL PRIMARY KEY` |
| Boolean | `BOOLEAN DEFAULT 0/1` | `BOOLEAN DEFAULT FALSE/TRUE` |
| Text Fields | `TEXT` | `VARCHAR(n)` or `TEXT` |
| Connection | File-based | Network-based |

## Troubleshooting

### Migration Errors
- Ensure `DATABASE_URL` is correctly set
- Check PostgreSQL service is running on Render
- Verify migration files are in correct path

### Connection Issues
- Confirm DATABASE_URL format: `postgres://user:pass@host:port/db?sslmode=require`
- Check Render PostgreSQL service status
- Verify network connectivity

### Performance
- PostgreSQL may be slower for simple queries but scales better
- Consider adding indexes for frequently queried columns
- Monitor connection pool usage

## Rollback Plan

To rollback to SQLite (for local development):

1. Remove or comment out `DATABASE_URL` environment variable
2. Set `DB_PATH=./data/soshi.db`
3. Set `MIGRATIONS_PATH=file://pkg/db/migrations/sqlite`
4. Restart application

The application will automatically detect and use SQLite.

## Production Checklist

- [ ] PostgreSQL database created on Render
- [ ] DATABASE_URL environment variable set
- [ ] Backend deployed and migrations successful
- [ ] Frontend updated with new API URL
- [ ] SSL certificates configured
- [ ] Hedera mainnet credentials set (if using blockchain features)
- [ ] File uploads configured for persistent storage
- [ ] Database backups enabled on Render

## Support

For issues with this migration:
1. Check Render service logs
2. Verify environment variables
3. Test database connectivity
4. Review migration file syntax

The application now supports both SQLite (development) and PostgreSQL (production) automatically based on environment configuration.
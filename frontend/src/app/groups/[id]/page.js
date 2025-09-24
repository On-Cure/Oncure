import { redirect } from 'next/navigation';

export default function GroupDetailPage({ params }) {
  redirect(`/communities/${params.id}`);
}
import Redirect, { redirectMetadata } from '@/components/Redirect';

export const metadata = redirectMetadata('/blog/'); // Retired WordPress URL.
export default function Page() { return <Redirect to='/blog/' />; }

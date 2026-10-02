import Redirect, { redirectMetadata } from '@/components/Redirect';

export const metadata = redirectMetadata('/'); // Retired WordPress URL.
export default function Page() { return <Redirect to='/' />; }

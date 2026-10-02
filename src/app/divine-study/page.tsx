import Redirect, { redirectMetadata } from '@/components/Redirect';

export const metadata = redirectMetadata('/about/'); // Retired WordPress URL.
export default function Page() { return <Redirect to='/about/' />; }

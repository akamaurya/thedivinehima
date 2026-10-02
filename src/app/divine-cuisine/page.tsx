import Redirect, { redirectMetadata } from '@/components/Redirect';

export const metadata = redirectMetadata('/dining/'); // Retired WordPress URL.
export default function Page() { return <Redirect to='/dining/' />; }

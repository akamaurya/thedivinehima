import Redirect, { redirectMetadata } from '@/components/Redirect';

export const metadata = redirectMetadata('/divine-holiday-packages/'); // Retired WordPress URL.
export default function Page() { return <Redirect to='/divine-holiday-packages/' />; }

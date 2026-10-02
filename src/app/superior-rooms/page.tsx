import Redirect, { redirectMetadata } from '@/components/Redirect';

export const metadata = redirectMetadata('/divine-rooms/'); // Retired WordPress URL.
export default function Page() { return <Redirect to='/divine-rooms/' />; }

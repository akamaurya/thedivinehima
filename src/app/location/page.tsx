import Redirect, { redirectMetadata } from '@/components/Redirect';

export const metadata = redirectMetadata('/contact-us/'); // Retired WordPress URL.
export default function Page() { return <Redirect to='/contact-us/' />; }

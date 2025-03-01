import ClientRedirect from '@/app/ClientRedirect';
import { redirect } from 'next/navigation';

export default function page() {
    // redirect("/about");

    return <ClientRedirect />;
}

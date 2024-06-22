import { ExclamationTriangleIcon } from "@heroicons/react/20/solid";

export default function Alert() {
    return (
        <div className="border-l-4 border-yellow-400 bg-yellow-50 p-4">
            <div className="flex">
                <div className="flex-shrink-0">
                    <ExclamationTriangleIcon
                        className="h-5 w-5 text-yellow-400"
                        aria-hidden="true"
                    />
                </div>
                <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                        You need to upgrade your account to use Drivers Log.{" "}
                        <span className="font-medium text-yellow-700">
                            Pay now to gain access.
                        </span>{" "}
                        If you wish to leave this page without paying, please sign out using
                        the button in the top right corner.
                    </p>
                </div>
            </div>
        </div>
    );
}

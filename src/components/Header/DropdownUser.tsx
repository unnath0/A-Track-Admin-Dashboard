import { useEffect, useRef, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { auth } from '../../database/firebase';

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const trigger = useRef<HTMLAnchorElement>(null);
  const dropdown = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current || !trigger.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target as Node) ||
        trigger.current.contains(target as Node)
      ) return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  }, [dropdownOpen]);

  // Close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  }, [dropdownOpen]);

  // Sign out the user and redirect to sign-in page
  const handleSignOut = async () => {
    try {
      await auth.signOut();
      console.log("Log out successful");
      setRedirect(true);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  // Check if redirect is true, then redirect to the sign-in page
  if (redirect) {
    return <Navigate to="/auth/signin" />;
  }

  return (
    <div className="relative">
      <Link
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
        to="#"
      >
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-black dark:text-white">
            Admin
          </span>
          <span className="block text-xs">Dept. of CSE</span>
        </span>
        <span className="h-12 w-12 rounded-full">
          <img
            src="https://www.jssatebstep.org/favicon/apple-touch-icon.png"
            alt="User"
          />
        </span>
        <svg
          className="hidden fill-current sm:block"
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.410765 0.910734C0.736202 0.585297 1.26384 0.585297 1.58928 0.910734L6.00002 5.32148L10.4108 0.910734C10.7362 0.585297 11.2638 0.585297 11.5893 0.910734C11.9147 1.23617 11.9147 1.76381 11.5893 2.08924L6.58928 7.08924C6.26384 7.41468 5.7362 7.41468 5.41077 7.08924L0.410765 2.08924C0.0853277 1.76381 0.0853277 1.23617 0.410765 0.910734Z"
            fill=""
          />
        </svg>
      </Link>

      {/* <!-- Dropdown Start --> */}
      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${
          dropdownOpen ? 'block' : 'hidden'
        }`}
      >
        <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-7.5 dark:border-strokedark">
          <li>
            <Link
              to="/profile"
              className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
            >
              <svg
                className="fill-current"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 9.62499C8.42188 9.62499 6.35938 7.59687 6.35938 5.12187C6.35938 2.64687 8.42188 0.618744 11 0.618744C13.5781 0.618744 15.6406 2.64687 15.6406 5.12187C15.6406 7.59687 13.5781 9.62499 11 9.62499ZM11 2.16562C9.28125 2.16562 7.90625 3.50624 7.90625 5.12187C7.90625 6.73749 9.28125 8.07812 11 8.07812C12.7188 8.07812 14.0938 6.73749 14.0938 5.12187C14.0938 3.50624 12.7188 2.16562 11 2.16562Z"
                  fill=""
                />
                <path
                  d="M17.7719 21.4156H4.2281C3.5406 21.4156 2.9906 20.8656 2.9906 20.1781V17.0844C2.9906 13.7156 5.7406 10.9656 9.10935 10.9656H12.925C16.2937 10.9656 19.0437 13.7156 19.0437 17.0844V20.1781C19.0094 20.8312 18.4594 21.4156 17.7719 21.4156ZM4.53748 19.8687H17.4969V17.0844C17.4969 14.575 15.4344 12.5125 12.925 12.5125H9.07498C6.5656 12.5125 4.5031 14.575 4.5031 17.0844V19.8687H4.53748Z"
                  fill=""
                />
              </svg>
              My Profile
            </Link>
          </li>
          <li>
            <Link
              to="#"
              className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
            >
              <svg
                className="fill-current"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.6687 1.44374C17.1187 0.893744 16.4312 0.618744 15.675 0.618744H7.42498C6.25623 0.618744 5.25935 1.58124 5.25935 2.78437V4.12499H4.29685C3.88435 4.12499 3.50623 4.46874 3.50623 4.91562C3.50623 5.36249 3.84998 5.70624 4.29685 5.70624H5.25935V10.2781H4.29685C3.88435 10.2781 3.50623 10.6219 3.50623 11.0687C3.50623 11.4812 3.84998 11.8594 4.29685 11.8594H5.25935V16.4312H4.29685C3.88435 16.4312 3.50623 16.775 3.50623 17.2219C3.50623 17.6687 3.84998 18.0469 4.29685 18.0469H5.25935V19.2875C5.25935 20.455 6.22185 21.4519 7.42498 21.4519H15.675C16.8687 21.4519 17.8656 20.4894 17.8656 19.2875V18.0469H18.7937C19.2062 18.0469 19.5844 17.7031 19.5844 17.2562C19.5844 16.8094 19.2406 16.4656 18.7937 16.4656H17.8656V11.8937H18.7937C19.2062 11.8937 19.5844 11.55 19.5844 11.1031C19.5844 10.6562 19.2406 10.2781 18.7937 10.2781H17.8656V5.70624H18.7937C19.2062 5.70624 19.5844 5.36249 19.5844 4.91562C19.5844 4.46874 19.2406 4.09062 18.7937 4.09062H17.8656V2.78437C17.8656 2.02812 17.5906 1.375 17.6687 1.44374ZM16.3187 19.2875C16.3187 19.6687 16.0344 19.9875 15.6406 19.9875H7.45935C7.0781 19.9875 6.75935 19.7031 6.75935 19.2875V2.78437C6.75935 2.40312 7.04373 2.08437 7.43748 2.08437H15.6187C16 2.08437 16.3187 2.36874 16.3187 2.78437V19.2875Z"
                  fill=""
                />
                <path
                  d="M12.0062 14.2656H9.0281C8.6156 14.2656 8.23748 14.6094 8.23748 15.0562C8.23748 15.5031 8.58123 15.8469 9.0281 15.8469H12.0062C12.4187 15.8469 12.7969 15.5031 12.7969 15.0562C12.7969 14.6094 12.4531 14.2656 12.0062 14.2656Z"
                  fill=""
                />
              </svg>
              My Billing
            </Link>
          </li>
          <li>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
            >
              <svg
                className="fill-current"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.0001 21.0002C5.01972 21.0002 0.499756 16.4802 0.499756 10.5002C0.499756 4.51979 5.01972 0 11.0001 0C11.4531 0 11.8212 0.368115 11.8212 0.821136C11.8212 1.27416 11.4531 1.64227 11.0001 1.64227C6.0679 1.64227 1.99993 5.71025 1.99993 10.6423C1.99993 15.5745 6.0679 19.6425 11.0001 19.6425C15.9322 19.6425 20.0002 15.5745 20.0002 10.6423C20.0002 10.1893 20.3683 9.82118 20.8213 9.82118C21.2743 9.82118 21.6425 10.1893 21.6425 10.6423C21.6425 16.4802 17.1422 21.0002 11.0001 21.0002Z"
                  fill=""
                />
                <path
                  d="M14.2325 14.2323C13.9282 14.5365 13.4286 14.5365 13.1243 14.2323L8.91129 10.0193C8.63048 9.73845 8.63048 9.26153 8.91129 8.98072L13.1243 4.76775C13.4286 4.46353 13.9282 4.46353 14.2325 4.76775C14.5367 5.07198 14.5367 5.5716 14.2325 5.87582L10.4618 9.64653L14.2325 13.4172C14.5367 13.7215 14.5367 14.2211 14.2325 14.2323Z"
                  fill=""
                />
              </svg>
              Sign Out
            </button>
          </li>
        </ul>
      </div>
      {/* <!-- Dropdown End --> */}
    </div>
  );
};

export default DropdownUser;

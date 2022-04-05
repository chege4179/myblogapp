import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {useSelector} from "react-redux";
import {SelectUser} from "../ReduxStore/UserReducer";
import {isBrowser} from "../util/HelperFunctions";

const withAuth = (WrappedComponent) => {
	if (isBrowser) {
		const user = JSON.parse(sessionStorage.getItem("user"))
		return (props) => {
			const router = useRouter();
			const [verified, setVerified] = useState(false);
			useEffect(async () => {
				if (!user) {
					router.replace("/");
				} else {
					setVerified(true)
				}
			}, []);

			if (verified) {
				return (<WrappedComponent {...props} />);
			} else {
				return null;
			}
		};

	}else {
		return null
	}

};

export default withAuth;

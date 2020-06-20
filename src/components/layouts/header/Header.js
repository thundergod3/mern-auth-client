import React from "react";
import { Link, withRouter } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import authAction from "../../../store/redux/actions/authAction";

const Header = ({ history, match }) => {
	const {
		authReducer: {
			isAuthenticated,
			userInfo: { name },
			adminRole,
		},
		utilReducer: { loadingList },
	} = useSelector((state) => state);
	const dispatch = useDispatch();
	const { signOutRequest } = authAction;

	const isActive = (path) => {
		if (history.location.pathname === path) return { color: "#000" };
		else return { color: "#fff" };
	};

	let loadingHeader;
	for (var i = 0; i < loadingList.length; i++) {
		if (loadingList[i].name === "getUser") loadingHeader = loadingList[i].loading;
	}

	return (
		<header>
			<ul className="nav nav-tabs bg-primary">
				<li className="nav-item">
					<Link className="nav-link" style={isActive("/")} to="/">
						Home
					</Link>
				</li>
				{isAuthenticated !== null && !isAuthenticated ? (
					<>
						<li className="nav-item">
							<Link className="nav-link" style={isActive("/signin")} to="/signin">
								Sign In
							</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" style={isActive("/signup")} to="/signup">
								Sign Up
							</Link>
						</li>
					</>
				) : (
					<>
						{loadingHeader ? (
							<li className="nav-item">
								<span className="nav-link">Loading...</span>
							</li>
						) : (
							<li className="nav-item">
								<span className="nav-link">{name}</span>
							</li>
						)}
						<li className="nav-item">
							{adminRole ? (
								<Link className="nav-link" to="/update-admin" style={isActive("/update-admin")}>
									Edit Profile
								</Link>
							) : (
								<Link className="nav-link" to="/update-user" style={isActive("/update-user")}>
									Edit Profile
								</Link>
							)}
						</li>
						<li className="nav-item">
							<span
								className="nav-link"
								onClick={() => dispatch(signOutRequest())}
								style={{ cursor: "pointer", color: "#fff" }}>
								Sign Out
							</span>
						</li>
					</>
				)}
			</ul>
		</header>
	);
};

export default withRouter(Header);

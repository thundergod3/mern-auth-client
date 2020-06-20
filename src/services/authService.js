import HTTPMethod from "./index";

class authService {
	login = (userForm) => HTTPMethod.post("/signin", userForm).then((res) => res.data);

	loginWithGoogle = (idToken) => HTTPMethod.post("/google-login", idToken).then((res) => res.data);

	loginWithFacebook = (fbForm) => HTTPMethod.post("/facebook-login", fbForm).then((res) => res.data);

	signUp = (userForm) => HTTPMethod.post("/signup", userForm).then((res) => res.data);

	activateAccount = (token) => HTTPMethod.post("/account-activation", { token }).then((res) => res.data);

	getUser = (userId) => HTTPMethod.get(`/user/${userId}`).then((res) => res.data);

	updateUser = (userInfo) => HTTPMethod.put("/user/update", userInfo).then((res) => res.data);

	updateAdmin = (userInfo) => HTTPMethod.put("/admin/update", userInfo).then((res) => res.data);

	forgotPassword = (formForgot) => HTTPMethod.put("/forgot-password", formForgot).then((res) => res.data);

	resetPassword = (formReset) => HTTPMethod.put("/reset-password", formReset).then((res) => res.data);

	attachTokenToHeader = (token) => {
		if (token && typeof token === "string") return HTTPMethod.attachTokenToHeader(token);
	};
}

export default new authService();

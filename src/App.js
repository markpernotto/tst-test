import {
  useCallback,
  useMemo,
  useState,
} from "react";
import "./App.css";

function App() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState(0);
  const [
    passwordConfirmation,
    setPasswordConfirmation,
  ] = useState(0);
  const [errorMessage, setErrorMessage] =
    useState("");
  const [loggedInUser, setLoggedInUser] =
    useState(null);

  const handleUserName = useCallback(
    (e) =>
      e.target.value.length > 0 &&
      setUserName(e.target.value),
    [],
  );
  const handlePassword = useCallback(
    (e) =>
      e.target.value.length > 0 &&
      setPassword(parseInt(e.target.value)),
    [],
  );
  const handlePasswordConfirmation = useCallback(
    (e) =>
      e.target.value.length > 0 &&
      setPasswordConfirmation(
        parseInt(e.target.value),
      ),
    [],
  );

  const potentialUsers = useMemo(() => {
    // I realize this is not a realistic way to do this, but it works for this example
    return [
      JSON.parse(process.env.REACT_APP_MARK),
      JSON.parse(process.env.REACT_APP_CLAYTON),
    ];
  }, []);

  const handleLogin = useCallback(
    (e) => {
      e.preventDefault();
      if (userName.length < 1) {
        setErrorMessage("User Name is required");
        return;
      }
      if (password.length < 1) {
        setErrorMessage("Password is required");
        return;
      }
      if (passwordConfirmation.length < 1) {
        setErrorMessage(
          "Password Confirmation is required",
        );
        return;
      }
      if (password !== passwordConfirmation) {
        setErrorMessage(
          "Password and Password Confirmation must match",
        );
        return;
      }

      const foundUser = potentialUsers?.find(
        (u) => u.user === userName.toLowerCase(),
      );
      if (!foundUser) {
        setErrorMessage("User not found");
        return;
      } else {
        if (foundUser.password !== password) {
          setErrorMessage(
            "Password is incorrect",
          );
          return;
        } else {
          setLoggedInUser(foundUser);
        }
      }
      setErrorMessage("");
    },
    [
      password,
      passwordConfirmation,
      potentialUsers,
      userName,
    ],
  );

  return (
    <div className="App">
      <header className="login-container">
        {loggedInUser ? (
          <>
            <h1>Welcome {loggedInUser.user}</h1>
            <button
              onClick={() => {
                setLoggedInUser(null);
                setUserName("");
                setPassword(0);
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <form onSubmit={handleLogin}>
            <h1>Login below</h1>
            <label className="description">
              *all fields are required
            </label>
            <input
              autoFocus
              type="text"
              placeholder="User Name"
              onChange={handleUserName}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={handlePassword}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              onChange={
                handlePasswordConfirmation
              }
            />
            <label className="error-message">
              {errorMessage}
            </label>
            <button type="submit">Login</button>
          </form>
        )}
      </header>
    </div>
  );
}

export default App;

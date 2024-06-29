const Header = () => {
  const handleLogOut = async () => {
    try {
      localStorage.removeItem("Token");
      sessionStorage.removeItem("Token");
      window.location.reload();
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  return (
    <div>
      <button onClick={handleLogOut}>Log Out</button>
    </div>
  );
};

export default Header;
// auth
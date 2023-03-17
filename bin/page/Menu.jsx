// src/components/Menu.tsx

const Menu = () => {
	return (
		<nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
		<div className="position-sticky pt-3">
			<ul className="nav flex-column">
			<li className="nav-item">
				<a className="nav-link active" aria-current="page" href="http://192.168.0.135:3001/">
				<span data-feather="home"></span>
				Dashboard
				</a>
			</li>
			</ul>
		</div>
		</nav>
	)
}

export default Menu
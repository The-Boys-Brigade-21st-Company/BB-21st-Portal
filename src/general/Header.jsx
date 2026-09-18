import { useState, useEffect, Fragment } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { handleServerError } from './handleServerError'
import { useUser } from './UserContext'
import { signOut, onAuthStateChanged } from "@firebase/auth";
import { doc, getDoc } from "@firebase/firestore";
import { auth, db } from "../firebase";
import styles from './header.module.css'

const Header = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [userImage, setUserImage] = useState(null);
	const { user, setUser, loggedIn, setLoggedIn, navigationViewable, setNavigationViewable } = useUser();
	const [buttons, setButtons] = useState(2);
	const [currentPage, setCurrentPage] = useState(window.location.pathname);
	
	const [submenuPos, setSubmenuPos] = useState({ x: 0, y: 0 });
	const [activeMenu, setActiveMenu] = useState(null);
	const baseTabs = {
		"statistics": { "My Attendance": ["/user_attendance", "'\\f4fd'"], "My Awards": ["/user_awards", "'\\f559'"], "My Inspection Results": ["/user_inspections", "'\\e3c7'"] },
		"management": { "User Management": ["/user_management", "'\\f0c0'"], "Parades & Attendance": ["/attendance_management", "'\\f15b'"], "Awards Management": ["/awards_management", "'\\f5f3'"], "Result Generation": ["/generate_result", "'\\f570'"], "Uniform Inspection": ["/uniform_inspection", "'\\e3c7'"] },
		"others": { "Resources": ["/resources", "'\\f02d'"], "Parade Notice": ["/parade_notice", "'\\f15b'"], "Calendar": ["/calendar", "'\\f133'"] }
	}
	const [tabs, setTabs] = useState(baseTabs);

	useEffect(() => {
		const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
			if (!firebaseUser) {
				if (!["/", "/login", "/parade_notice"].includes(location.pathname)) {
					return navigate('/login?next=' + location.pathname);
				}
				return;
			}

			setUserImage(firebaseUser.photoURL === "" ? null : firebaseUser.photoURL);
			setLoggedIn(true);
			const tokenResult = await firebaseUser.getIdTokenResult();
			const claims = tokenResult.claims;
			const ref = doc(db, "users", firebaseUser.uid);
			const snap = await getDoc(ref);
			if (!snap.exists()) return;
			const data = snap.data();

			const fullUser = {
				uid: firebaseUser.uid,
				...data,
				appointment: claims.appt
			};

			setUser(fullUser);

			const updatedTabs = JSON.parse(JSON.stringify(baseTabs));
			if (fullUser.t !== "Boy" && fullUser.t !== "Admin") {
				delete updatedTabs.statistics["My Awards"]
				delete updatedTabs.statistics["My Inspection Results"]
			}

			if (fullUser.t === "Boy" && fullUser.appointment) delete updatedTabs.management["Uniform Inspection"]
			if (fullUser.t === "Boy" && !fullUser.appointment) delete updatedTabs.management;
			setTabs(updatedTabs);
		});

		setCurrentPage(window.location.pathname);
		return () => unsub();
	}, [navigate, location]);

	const logOut = async () => {
		try {
			await signOut(auth);
			setLoggedIn(false);
			setUser({});
			setNavigationViewable(false);
			navigate('/login')
		} catch (err) {
			console.error("Error logging out:", err);
			handleServerError(err.response.status)
		}
	}

	const handleSubmenuClick = (e, menuKey) => {
		if (activeMenu === menuKey) {
			setActiveMenu(null);
			return;
		}

		const rect = e.currentTarget.getBoundingClientRect();
		setSubmenuPos({
			x: rect.left,
			y: rect.bottom
		});
		setActiveMenu(menuKey);
	};

	return (
		<>
			<header>
				<div className={styles.logo} onClick={() => navigate(loggedIn ? '/home' : '/login')}>
					<img src="/bb-crest.png" alt='BB Logo' width={"60px"} height={"60px"} />
					<div>
						<p>The boys' brigade</p>
						<span>21st Singapore Company</span>
					</div>
				</div>

				<div className={styles.topbar}>
					{!loggedIn ? <>
						<div onClick={() => window.open("https://portal.bb21coy.workers.dev/calendar", "_blank")}>Calendar</div>
						<div onClick={() => navigate('/parade_notice')}>Parade Notice</div>
						<div onClick={() => navigate('/login')}>Login</div>
					</> : <>
						<div data-logout onClick={logOut}>Logout</div>
					</>}
					<i className='fa-solid fa-bars' onClick={() => setNavigationViewable(prevState => !prevState)}></i>
				</div>
			</header>

			<div className={styles.sidebar_background} style={{ opacity: navigationViewable ? "1" : "0" }}></div>
			<div className={styles.sidebar} style={{ right: navigationViewable ? '0' : "-110vw" }}>
				<div>
					<i className='fa-solid fa-xmark' onClick={() => setNavigationViewable(prevState => !prevState)}></i>
				</div>

				<div>
					{!loggedIn ? <>
						<button onClick={() => window.open("https://portal.bb21coy.workers.dev/parade_notice", "_blank")} style={{ "--icon": '"\\f15b"' }}>Parade Notice</button>
						<button onClick={() => window.open("https://portal.bb21coy.workers.dev/calendar", "_blank")} style={{ "--icon": '"\\f133"' }}>Calendar</button>
						<hr />
						<button data-main-button onClick={() => navigate('/login')}>Login</button>
					</> : <>
						<button onClick={() => navigate('/home')} style={{ "--icon": '"\\f015"' }} className={currentPage === '/home' ? styles.active : ''}>Dashboard</button>

						<hr />
						<button data-main-button onClick={logOut}>Logout</button>
					</>}
				</div>
			</div>
		</>
	)
}

export default Header

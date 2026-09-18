import styles from "./notFound.module.scss";

function NotFound() {
	return (
		<div className={styles["not-found"]}>
			<h2>Page Not Found</h2>
			<p>Were you meant to navigate somewhere on the new portal? Or did just lose your way?</p>
		</div>
	);
}

export default NotFound;
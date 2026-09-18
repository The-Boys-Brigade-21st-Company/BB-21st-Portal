import styles from "./footer.module.scss"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useUser } from "./UserContext"

const Footer = () => {
    const { user } = useUser()
    const navigate = useNavigate()

    return (
        <footer>
            <div className={styles.bottom}>
                <p>This hope we have as an anchor of the soul, a hope both <strong>sure and stedfast</strong> and one which enters within the veil where Jesus has entered as a forerunner for us... Hebrews 6:19-20a</p>
			</div>
        </footer>
    )
}

export default Footer

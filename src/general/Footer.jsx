import styles from "./footer.module.scss"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useUser } from "./UserContext"

const Footer = () => {
    const { user } = useUser()
    const navigate = useNavigate()

    return (
        <footer>
            <div className={styles.top}>
                <div className={styles.links}>
                    <p>Affiliated With</p>
                    <p onClick={() => window.open("https://www.geylangmethodistsec.moe.edu.sg", "_blank")}>Geylang Methodist School (Secondary)</p>
                    <p onClick={() => window.open("https://www.cmch.sg", "_blank")}>Christalite Methodist Chapel</p>
                </div>

                <div className={styles.links}>
                    <p>Associated Websites</p>
                    <p onClick={() => window.open("https://www.bb.org.sg", "_blank")}>BB Singapore</p>
                    <p onClick={() => window.open("https://members.bb.org.sg", "_blank")}>BB Members Portal</p>
                    <p onClick={() => window.open("https://portal.bb21coy.workers.dev", "_blank")}>BB 21st Portal (New)</p>
                </div>
            </div>

            <div className={styles.bottom}>
                <p>This hope we have as an anchor of the soul, a hope both <strong>sure and stedfast</strong> and one which enters within the veil where Jesus has entered as a forerunner for us... Hebrews 6:19-20a</p>
			</div>
        </footer>
    )
}

export default Footer

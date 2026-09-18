import { useNavigate } from "react-router-dom"
import styles from './dashboardPage.module.css'
import type { CSSProperties } from "react";

type DashboardOptionsProps = {
    title: string;
    url: string;
    icon: string;
    description: string;
    migrating?: boolean;
}

const DashboardOptions = ({ title, url, icon, description, migrating = false }: DashboardOptionsProps) => {
    const navigate = useNavigate()
    const isMigrating = () => migrating ? window.open(`https://portal.bb21coy.workers.dev${url}`, "_blank") : navigate(url)

    return (
        <div className={styles.route} style={{ '--color': `#26284B` } as CSSProperties} onClick={isMigrating}>
            <div>
                <i className={`fa-regular fa-${icon}`}></i>
            </div>
            <p>{title}</p>
        </div>
    )
}

export default DashboardOptions
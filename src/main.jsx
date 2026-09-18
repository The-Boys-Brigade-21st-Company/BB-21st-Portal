import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { UserProvider } from "./general/UserContext";

import Layout from './general/Layout';
import Loading from './general/Loading';
import ErrorBoundary from "./general/ErrorBoundary";
import UserPermissions from './general/UserPermissions';
import NotFound from "./general/NotFound";

const LogInPage = lazy(() => import('./Login/LogInPage.jsx'));
const ResetPasswordPage = lazy(() => import('./userManagementPage/ResetPasswordPage'));
const DashboardPage = lazy(() => import('./dashboardPage/dashboardPage'));

createRoot(document.body).render(
	<StrictMode>
		<ErrorBoundary>
			<Router>
				<Suspense fallback={<Loading />}>
					<UserProvider>
						<Routes>
							<Route path='/login' element={<LogInPage />} />
							<Route path='/' element={<LogInPage />} />
							<Route element={<Layout />}>
								<Route path='/parade_notice' element={<Navigate to="https://portal.bb21coy.workers.dev/parade_notice" />} />
								
								<Route path='/home' element={
									<UserPermissions allowedAccountTypes={['Admin', 'Officer', 'Primer', 'Boy']}>
										<DashboardPage />
									</UserPermissions>
								} />

								<Route path='/manage_login' element={<ResetPasswordPage />} />
								<Route path="*" element={<NotFound />} />
							</Route>
						</Routes>
					</ UserProvider>
				</Suspense>
			</Router>
		</ErrorBoundary>
	</StrictMode>
);

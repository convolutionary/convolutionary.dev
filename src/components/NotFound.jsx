import React from "react";
import { Link } from "react-router-dom";
import Window from "./Window";

const NotFound = () => (
	<div className="flex items-center justify-center min-h-screen p-4">
		<Window title="Error" style={{ width: 300 }}>
			<div style={{ textAlign: 'center', padding: '12px 0' }}>
				<p style={{ fontSize: 36, marginBottom: 8 }}>⚠</p>
				<p style={{ fontWeight: 'bold', marginBottom: 4 }}>Page not found.</p>
				<p style={{ fontSize: 11, color: '#666', marginBottom: 12 }}>
					The requested page does not exist.
				</p>
				<Link to="/" className="btn">OK</Link>
			</div>
		</Window>
	</div>
);

export default NotFound;

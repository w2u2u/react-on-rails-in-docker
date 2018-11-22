import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Affix, Layout, Menu, Icon } from "antd";

export default function Dashboard(props) {
	const [currentMenu, setCurrectMenu] = useState("movie");

	function handleMenuClick(event) {
		setCurrectMenu(event.key);
	}

	return (
		<Affix>
			<Layout>
				<Layout.Content>
					<Menu
						onClick={handleMenuClick}
						selectedKeys={[currentMenu]}
						mode="horizontal"
					>
						<Menu.Item key="movie">
							<Link to="/">
								<Icon type="video-camera" />
								Movies
							</Link>
						</Menu.Item>
						<Menu.Item key="director">
							<Link to="/director">
								<Icon type="user" />
								Directors
							</Link>
						</Menu.Item>
					</Menu>
				</Layout.Content>
			</Layout>
		</Affix>
	);
}

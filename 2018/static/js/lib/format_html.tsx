import * as React from "react";

import { zp2 } from "./format";

export function format_play_time(ms: number) {
	let day_marker = null;
	if (ms > 86400000) {
		day_marker = Math.floor(ms / 86400000) + "/";
	}
	const hours = Math.floor(ms / 3600000) % 24 + "";
	const minutes = Math.floor(ms / 60000) % 60 + "";
	const seconds = Math.floor(ms / 1000) % 60 + "";
	const cs = <span style={{ fontSize: "75%" }}>.{zp2(Math.floor(ms / 10) % 100 + "")}</span>
	return <span>
		{day_marker}{zp2(hours)}:{zp2(minutes)}:{zp2(seconds)}{cs}
	</span>;
}



// WEBPACK FOOTER //
// ./src/lib/format_html.tsx
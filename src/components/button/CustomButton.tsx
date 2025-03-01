import React, { ReactNode } from "react";

type Props = {
	children: ReactNode;
};

export const CustomButton = (props: Props) => {
	return <button>{props.children}</button>;
};

export default CustomButton;

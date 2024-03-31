import React from "react";

const Card = (props) => {
	const inputDate = props.metadata;
	const dateObject = new Date(inputDate);
	const year = dateObject.getFullYear();

	return (
		<div className="card" key={props.key}>
			<a href={props.link}>
				<div className="card-img">
					<img src={props.img} alt="alt" />
				</div>
				<div className="cardDetails">
					<h3 className="card-name">
						{props.name}
					</h3>
					{!year ? (
						<>
							<p className="card-date">{props.artist}</p>
						</>
					) : (
						<>
							<p className="card-date">{year} • {props.artist}</p>
						</>
					)}
				</div>
			</a>
		</div>
	);
}

export default Card;
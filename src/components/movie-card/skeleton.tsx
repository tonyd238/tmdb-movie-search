export const MovieCardSkeleton = () => {
	return <div className="bg-white rounded-[15px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.1)] w-full">
		{/* Постер */}
		<div
			className="w-full h-[400px] bg-[linear-gradient(90deg,#f0f0f0_0%,#e0e0e0_50%,#f0f0f0_100%)] bg-[length:200%_100%] animate-shimmer"/>

		{/* Текстовая информация */}
		<div className="p-6">
			{/* Title */}
			<div
				className="h-5 w-[80%] rounded bg-[linear-gradient(90deg,#f0f0f0_0%,#e0e0e0_50%,#f0f0f0_100%)] bg-[length:200%_100%] animate-shimmer mb-4"/>

			{/* Year */}
			<div
				className="h-4 w-[30%] rounded bg-[linear-gradient(90deg,#f0f0f0_0%,#e0e0e0_50%,#f0f0f0_100%)] bg-[length:200%_100%] animate-shimmer mb-4"/>

			{/* Overview lines */}
			<div className="space-y-4">
				<div
					className="h-4 w-full rounded bg-[linear-gradient(90deg,#f0f0f0_0%,#e0e0e0_50%,#f0f0f0_100%)] bg-[length:200%_100%] animate-shimmer"/>
				<div
					className="h-4 w-[90%] rounded bg-[linear-gradient(90deg,#f0f0f0_0%,#e0e0e0_50%,#f0f0f0_100%)] bg-[length:200%_100%] animate-shimmer"/>
				<div
					className="h-4 w-[60%] rounded bg-[linear-gradient(90deg,#f0f0f0_0%,#e0e0e0_50%,#f0f0f0_100%)] bg-[length:200%_100%] animate-shimmer"/>
			</div>
		</div>
	</div>

}
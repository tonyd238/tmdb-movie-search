export const ModalSkeleton = () => {
	return (
		<div className="animate-pulse">
			<div className="flex items-center justify-between mb-4">
				<div className="h-6 w-48 bg-gray-300 rounded"/>
				<div className="h-8 w-8 bg-gray-300 rounded-full"/>
			</div>

			<div className="flex flex-col md:flex-row gap-2 md:gap-4 mt-3 md:items-start">
				<div className="aspect-[4/3] w-full md:max-w-[250px] md:aspect-[3/4.5] rounded-[10px] bg-gray-200 animate-pulse flex-shrink-0" />

				<div className="flex flex-col gap-3 w-full">
					{/* Chip */}
					<div className="h-6 w-[120px] rounded-full bg-gray-300 animate-pulse mb-2 max-w-max" />

					{/* Genres */}
					<div className="flex flex-wrap gap-2 mb-4">
						{Array.from({ length: 3 }).map((_, i) => (
							<div key={i} className="h-6 w-[80px] rounded-full bg-gray-200 animate-pulse" />
						))}
					</div>

					{/* Rating & Year */}
					<div className="flex gap-2 md:flex-col md:mb-2">
						<div className="h-4 w-[100px] bg-gray-300 rounded animate-pulse" />
						<div className="h-4 w-[80px] bg-gray-300 rounded animate-pulse" />
					</div>

					{/* Description */}
					<div className="space-y-2">
						<div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
						<div className="h-4 w-[90%] bg-gray-200 rounded animate-pulse" />
						<div className="h-4 w-[70%] bg-gray-200 rounded animate-pulse" />
					</div>
				</div>
			</div>

		</div>
	)
}
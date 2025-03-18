"use client"

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { DataTable } from "@/components/ui/data-table"

import { Employee } from "@/types"

import { columns, stats } from "../mocks"

type DashboardType = {
	data: Employee[];
}

const Dashboard = ({ data }: DashboardType) => {
	return (
		<div className="container mx-auto px-2 py-10 space-y-4">
			<section className="flex flex-col items-start gap-2 border-b border-border/40 py-8 dark:border-border md:py-10 lg:py-12">
				<div className="container">
					<h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]">Compliance Tracker Dashboard</h1>
					<p className="max-w-2xl text-lg font-light text-foreground">Monitor training progress across your team. Quickly identify employees who are on track, behind, or yet to start their required programs.</p>
				</div>
			</section>
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				{stats?.map((stat, index) => (
					<Card key={index}>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								{stat.title}
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">{stat.value}</div>
							<p className="text-xs text-muted-foreground">
								{stat.description}
							</p>
						</CardContent>
					</Card>
				))}
			</div>
			<div>
				<DataTable columns={columns} data={data} />
			</div>
		</div>
	)
}

export default Dashboard
import {dateCalculateDifference} from "@/helpers/formating";

export const prepareOrder = (order) => {
	const diff = order.Deadline ? dateCalculateDifference(new Date(), new Date(order.Deadline)) : dateCalculateDifference();
	order.overdueTitle = diff.title;
	order.overdueSummary = diff.summary;
	order.showInList = {
		byNumber: true,
		byPriority: true,
		byRole: true,
		byStatus: true,
		byDepartment: true,
		byType: true
	};
	return order;
}

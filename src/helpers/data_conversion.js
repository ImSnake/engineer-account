import {dateCalculateDifference, dateFormatDdMmYyyy} from "@/helpers/formating";

export const prepareCustomer = (customer) => {
	if (customer.birthdayDate) {
		customer.birthdayDate = dateFormatDdMmYyyy(customer.birthdayDate);
	}

	if (customer.issueDate) {
		customer.issueDate = dateFormatDdMmYyyy(customer.issueDate);
	}

	if (customer.passportDetails) {
		const pass = customer.passportDetails.split(' ');
		customer.passportSeries = pass[0];
		customer.passportNumber = pass[1];
	} else {
		customer.passportSeries = '';
		customer.passportNumber = '';
	}

	return customer;
}

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

export const prepareScoreServices = (data) => {
	const servicesDict = data.services;
	const serviceCategories = data.serviceCategories;
	const servicesMap = {};
	let services = [];

	servicesDict.forEach(({ScoreServiceCategoryID, ScoreServiceID, ServiceTitle, ServiceScore}) => {
		(servicesMap[ScoreServiceCategoryID] = (servicesMap[ScoreServiceCategoryID] || [])).push({
			id: ScoreServiceID,
			name: ServiceTitle,
			value: ServiceScore
		});
	});

	serviceCategories.forEach(({ScoreServiceCategoryID, CategoryTitle}) => {
		services.push({
			categoryId: ScoreServiceCategoryID,
			name: CategoryTitle,
			list: servicesMap[ScoreServiceCategoryID] || []
		});
	});

	return services;
}

export const prepareFilterDepartments = (data) => {
	const departments = data.list;
	let levels = [];
	let spaces = '';

	for (let a = 0; a <= +data.levelCount; a++) {
		levels.push({level: a, spaces: spaces});
		spaces += '&nbsp;&nbsp;&nbsp;&nbsp;';
	}
	departments.forEach(i => {
		i.name = levels[+i.level].spaces + i.name;
		i.value = (+i.level === 0) ? 0 : i.departmentId;
	});

	return departments;
}

export const prepareWorkItem = (data, item, openState) => {
	item.workParticipants = data.workParticipants;
	item.workServices = data.workServices;
	item.hasDetails = true;

	if (openState) {
		item.isOpened = openState;
	}

	return item;
}

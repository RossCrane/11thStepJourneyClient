// export const unreadNotificationsFunc = (
// 	notifications: Notification[] | null
// ) => {
// 	return notifications.filter((n) => n.isRead === false);
// };

export const unreadNotificationsFunc = (
	notifications: Notification[] | null
) => {
	if (!notifications) return [];
	return notifications.filter((n) => n.isRead === false);
};

export const unreadNotificationsFunc = (
	notifications: Notification[] | null
) => {
	if (!notifications) return [];
	return notifications.filter((n) => n.isRead === false);
};

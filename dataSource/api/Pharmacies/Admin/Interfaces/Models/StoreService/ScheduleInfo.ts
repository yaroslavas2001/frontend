

export default class ScheduleInfo  {
	Id: number = 0;
	WeekDays: number = 0;
	From?: Date = null;
	To?: Date = null;
	IsAroundTheClock: boolean = false;
	constructor(obj?: Partial<ScheduleInfo>) {
		if (obj) {
			Object.assign(this, obj);
		}
	}
}

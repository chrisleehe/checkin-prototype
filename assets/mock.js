/* ============================================================
   mock.js · 统一数据源（window.DB）
   所有页面仅从 DB 读取数据，禁止散落硬编码
   基准日期：2026-09-17（周四）
   ============================================================ */
window.DB = {

  today: "2026-09-17",
  todayWeek: "周四",
  currentUser: {
    id: "EMP0231", name: "陈晓雯", dept: "产品设计部", role: "产品经理",
    superior: "林航 · 设计总监", annualLeaveLeft: 6.5
  },
  admin: { name: "王莉", role: "系统管理员" },

  /* ---------- 考勤规则 ---------- */
  rules: [
    {
      id: "RULE-001",
      name: "总部标准考勤（默认）",
      scope: ["产品设计部", "研发中心", "市场运营部", "人力资源部"],
      workdays: [1, 2, 3, 4, 5],
      onDuty: "09:00", offDuty: "18:00",
      graceMinutes: 10,
      clockMethods: ["gps", "wifi"],
      gpsRange: 500,
      wifiSsids: ["HQ-Office-5G", "HQ-Office-2.4G"],
      flexible: { enabled: false, minutes: 0 },
      makeupLimit: 3,
      autoHoliday: true,
      usedBy: 86, status: "active",
      updated: "2026-08-30 王莉"
    },
    {
      id: "RULE-002",
      name: "客服中心轮班制",
      scope: ["客户成功部"],
      workdays: [1, 2, 3, 4, 5, 6, 0],
      onDuty: "08:30", offDuty: "17:30",
      graceMinutes: 5,
      clockMethods: ["wifi"],
      gpsRange: null,
      wifiSsids: ["CS-Center"],
      flexible: { enabled: true, minutes: 30 },
      makeupLimit: 2,
      autoHoliday: false,
      usedBy: 18, status: "active",
      updated: "2026-09-02 王莉"
    },
    {
      id: "RULE-003",
      name: "门店导购排班（停用）",
      scope: ["零售运营部"],
      workdays: [1, 2, 3, 4, 5],
      onDuty: "10:00", offDuty: "19:00",
      graceMinutes: 0,
      clockMethods: ["gps"],
      gpsRange: 300,
      wifiSsids: [],
      flexible: { enabled: false, minutes: 0 },
      makeupLimit: 1,
      autoHoliday: true,
      usedBy: 0, status: "inactive",
      updated: "2026-07-15 王莉"
    }
  ],

  /* ---------- 当前用户 9 月记录 ---------- */
  records: [
    { date: "2026-09-01", week: "周二", on: { time: "08:49", method: "gps", loc: "总部大楼 A 座" }, off: { time: "18:35", method: "gps" }, status: "normal" },
    { date: "2026-09-02", week: "周三", on: { time: "08:52", method: "wifi" }, off: { time: "18:21", method: "wifi" }, status: "normal" },
    { date: "2026-09-03", week: "周四", on: { time: "08:58", method: "gps", loc: "总部大楼 A 座" }, off: { time: "18:44", method: "gps" }, status: "normal" },
    { date: "2026-09-04", week: "周五", on: { time: "08:45", method: "wifi" }, off: { time: "18:02", method: "wifi" }, status: "normal" },
    { date: "2026-09-05", week: "周六", on: null, off: null, status: "rest" },
    { date: "2026-09-06", week: "周日", on: null, off: null, status: "rest" },
    { date: "2026-09-07", week: "周一", on: { time: "08:51", method: "gps", loc: "总部大楼 A 座" }, off: { time: "18:30", method: "gps" }, status: "normal" },
    { date: "2026-09-08", week: "周二", on: { time: "09:24", method: "wifi" }, off: { time: "18:40", method: "wifi" }, status: "late", note: "迟到 24 分钟" },
    { date: "2026-09-09", week: "周三", on: { time: "08:47", method: "gps", loc: "总部大楼 A 座" }, off: { time: "18:19", method: "gps" }, status: "normal" },
    { date: "2026-09-10", week: "周四", on: { time: "09:02", method: "field", loc: "客户现场 · 深圳湾科技园" }, off: { time: "17:48", method: "field" }, status: "field", note: "客户拜访（已审批）" },
    { date: "2026-09-11", week: "周五", on: { time: "08:56", method: "wifi" }, off: { time: "18:26", method: "wifi" }, status: "normal" },
    { date: "2026-09-12", week: "周六", on: null, off: null, status: "rest" },
    { date: "2026-09-13", week: "周日", on: null, off: null, status: "rest" },
    { date: "2026-09-14", week: "周一", on: null, off: { time: "18:12", method: "gps" }, status: "makeup", note: "上班缺卡，已补卡通过", makeup: { id: "AP-20260914-006", status: "approved" } },
    { date: "2026-09-15", week: "周二", on: { time: "08:53", method: "wifi" }, off: { time: "18:08", method: "wifi" }, status: "normal" },
    { date: "2026-09-16", week: "周三", on: { time: "08:55", method: "gps", loc: "总部大楼 A 座" }, off: { time: "18:02", method: "gps" }, status: "normal" },
    { date: "2026-09-17", week: "周四", on: { time: "08:57", method: "gps", loc: "总部大楼 A 座" }, off: null, status: "today" }
  ],

  /* ---------- 今日团队打卡（PC 仪表盘/记录页） ---------- */
  teamToday: [
    { empId: "EMP0231", name: "陈晓雯", dept: "产品设计部", on: "08:57", onMethod: "gps", off: null, offMethod: null, status: "normal", duration: null },
    { empId: "EMP0177", name: "李昊", dept: "研发中心", on: "09:18", onMethod: "wifi", off: null, offMethod: null, status: "late", duration: null },
    { empId: "EMP0310", name: "周洁", dept: "市场运营部", on: null, onMethod: null, off: null, offMethod: null, status: "field", duration: null, note: "外勤 · 上海静安嘉里中心（待审批）" },
    { empId: "EMP0205", name: "郑凯", dept: "产品设计部", on: "08:42", onMethod: "gps", off: null, offMethod: null, status: "normal", duration: null },
    { empId: "EMP0228", name: "王倩", dept: "研发中心", on: "08:36", onMethod: "gps", off: null, offMethod: null, status: "normal", duration: null },
    { empId: "EMP0451", name: "孙磊", dept: "研发中心", on: "09:02", onMethod: "wifi", off: null, offMethod: null, status: "normal", duration: null },
    { empId: "EMP0367", name: "吴敏", dept: "市场运营部", on: null, onMethod: null, off: null, offMethod: null, status: "absent", duration: null, note: "年假（已通过）" },
    { empId: "EMP0192", name: "赵宇", dept: "客户成功部", on: "08:28", onMethod: "wifi", off: null, offMethod: null, status: "normal", duration: null },
    { empId: "EMP0284", name: "林芳", dept: "人力资源部", on: "08:31", onMethod: "gps", off: null, offMethod: null, status: "normal", duration: null },
    { empId: "EMP0139", name: "黄志强", dept: "研发中心", on: "09:31", onMethod: "wifi", off: null, offMethod: null, status: "severeLate", duration: null, note: "严重迟到 31 分钟" },
    { empId: "EMP0503", name: "徐静", dept: "产品设计部", on: "08:48", onMethod: "wifi", off: null, offMethod: null, status: "normal", duration: null },
    { empId: "EMP0246", name: "高翔", dept: "市场运营部", on: "08:55", onMethod: "gps", off: null, offMethod: null, status: "normal", duration: null }
  ],
  teamSummary: { total: 12, present: 10, late: 2, severeLate: 1, field: 1, absent: 1, rate: "83.3%" },
  weekTrend: [
    { day: "周一 09-14", rate: 91.7 }, { day: "周二 09-15", rate: 100 },
    { day: "周三 09-16", rate: 100 }, { day: "周四 09-17", rate: 83.3 }, { day: "周五 09-18", rate: 0 }
  ],
  deptRank: [
    { dept: "研发中心", present: 31, total: 33 }, { dept: "产品设计部", present: 22, total: 24 },
    { dept: "市场运营部", present: 15, total: 18 }, { dept: "客户成功部", present: 11, total: 12 },
    { dept: "人力资源部", present: 6, total: 6 }
  ],

  /* ---------- 审批单 ---------- */
  approvals: [
    {
      id: "AP-20260917-001", type: "makeup", typeName: "补卡", applicant: "李昊", empId: "EMP0177", dept: "研发中心",
      target: "2026-09-15 上班 09:02", reasonType: "交通延误", reason: "地铁 2 号线信号故障临时停车，出站后第一时间补卡，附延误截图证明。",
      attach: ["地铁延误截图.jpg"], submitted: "09-16 22:14", cc: ["张明"],
      flow: [{ node: "直属上级 · 张明", state: "done", time: "09-17 09:05" }, { node: "HR 复核 · 王莉", state: "doing", time: "" }],
      status: "pending", makeupUsed: 2, makeupLimit: 3
    },
    {
      id: "AP-20260917-002", type: "field", typeName: "外勤", applicant: "周洁", empId: "EMP0310", dept: "市场运营部",
      target: "2026-09-17 全天", reasonType: "客户拜访", reason: "拜访客户上海区域总部，进行 Q4 联合营销方案提案，地点：静安嘉里中心 32F。",
      attach: ["现场照片-01.jpg", "现场照片-02.jpg", "拜访预约函.pdf"], submitted: "09-17 08:20", cc: ["赵宇"],
      flow: [{ node: "直属上级 · 赵宇", state: "doing", time: "" }],
      status: "pending", makeupUsed: 1, makeupLimit: 3
    },
    {
      id: "AP-20260917-003", type: "leave", typeName: "请假", applicant: "郑凯", empId: "EMP0205", dept: "产品设计部",
      target: "2026-09-18 下午 · 年假 0.5 天", reasonType: "年假", reason: "家中事务需处理，已与设计总监确认工作交接。",
      attach: [], submitted: "09-17 10:42", cc: [],
      flow: [{ node: "直属上级 · 林航", state: "done", time: "09-17 11:20" }, { node: "HR 复核 · 王莉", state: "doing", time: "" }],
      status: "pending", makeupUsed: 0, makeupLimit: 3
    },
    {
      id: "AP-20260914-006", type: "makeup", typeName: "补卡", applicant: "陈晓雯", empId: "EMP0231", dept: "产品设计部",
      target: "2026-09-14 上班 08:58", reasonType: "忘打卡", reason: "早晨到岗后直接进入评审会议，忘记打卡，会议室门禁有进入记录。",
      attach: ["门禁记录.png"], submitted: "09-14 20:31", cc: ["林航"],
      flow: [{ node: "直属上级 · 林航", state: "done", time: "09-14 21:02" }, { node: "HR 复核 · 王莉", state: "done", time: "09-15 09:30" }],
      status: "approved", makeupUsed: 1, makeupLimit: 3
    },
    {
      id: "AP-20260910-011", type: "field", typeName: "外勤", applicant: "孙磊", empId: "EMP0451", dept: "研发中心",
      target: "2026-09-10 下午", reasonType: "设备调试", reason: "机房设备巡检调试。",
      attach: [], submitted: "09-10 16:00", cc: [],
      flow: [{ node: "直属上级 · 张明", state: "rejected", time: "09-10 17:40" }],
      status: "rejected", rejectReason: "未按规范附现场照片，请补充后重新提交", makeupUsed: 0, makeupLimit: 3
    }
  ],

  /* ---------- 我的统计 ---------- */
  myStats: {
    month: "2026-09",
    attendDays: 12, lateTimes: 1, earlyTimes: 0, missedTimes: 1, fieldDays: 1,
    leaveDays: 0, makeupUsed: 1, makeupLimit: 3, avgHours: "8.6h", overtime: "3.5h"
  },
  myApprovals: [
    { id: "AP-20260914-006", type: "补卡", target: "09-14 上班 08:58", status: "approved", time: "09-15 09:30" },
    { id: "AP-20260830-002", type: "外勤", target: "08-28 全天 · 客户现场", status: "approved", time: "08-28 18:10" },
    { id: "AP-20260812-009", type: "请假", target: "08-12 下午 · 事假", status: "rejected", time: "08-12 10:00", note: "事由描述过简，请补充" }
  ],

  /* ---------- 状态映射（全站统一文案） ---------- */
  STATUS: {
    normal: "正常", late: "迟到", severeLate: "严重迟到", early: "早退", missed: "缺卡",
    absent: "旷工/请假", field: "外勤", makeup: "补卡", leave: "假勤", rest: "休息",
    today: "进行中", pending: "待审批", approved: "已通过", rejected: "已驳回"
  },
  METHOD: { gps: "GPS 定位", wifi: "办公 WiFi", field: "外勤打卡", makeup: "补卡" }
};

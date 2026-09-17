/* ============================================================
   api.js · API 桩层（window.API）
   形状即未来真实 API：替换 TODO 处为真实请求即可接后端
   ============================================================ */
window.API = (() => {
  const delay = (ms = 380) => new Promise(r => setTimeout(r, ms));
  const ok = (data) => ({ code: 0, msg: "success", data });

  return {
    /** 获取当前用户今日打卡状态
     *  GET /api/attendance/today?empId=EMP0231 → { onClock, offClock, fieldWork } */
    async fetchTodayStatus(empId) {
      await delay();
      const rec = DB.records.find(r => r.date === DB.today);
      return ok({ onClock: rec?.on || null, offClock: rec?.off || null });
    },

    /** 上班打卡
     *  POST /api/attendance/clock-in { empId, method, loc, time } */
    async clockIn(payload) {
      await delay(600);
      const time = new Date().toTimeString().slice(0, 5);
      return ok({ time, method: payload.method, loc: payload.loc || "总部大楼 A 座" });
    },

    /** 下班打卡
     *  POST /api/attendance/clock-out { empId, method, time } */
    async clockOut(payload) {
      await delay(600);
      return ok({ time: new Date().toTimeString().slice(0, 5), method: payload.method });
    },

    /** 外勤打卡（需照片 + 事由）
     *  POST /api/attendance/clock-field { empId, loc, reason, photos[] } */
    async clockField(payload) {
      await delay(700);
      return ok({ id: "AP-" + Date.now().toString().slice(-6), status: "pending" });
    },

    /** 月度个人记录
     *  GET /api/attendance/my-records?month=2026-09 → records[] */
    async fetchMyRecords(month) {
      await delay();
      return ok(DB.records);
    },

    /** 团队考勤列表（PC 记录页）
     *  GET /api/attendance/team?date=&dept=&status=&page= → { list, total } */
    async fetchTeamRecords(filter = {}) {
      await delay(420);
      return ok({ list: DB.teamToday, total: DB.teamToday.length });
    },

    /** 仪表盘聚合
     *  GET /api/attendance/dashboard → { teamSummary, weekTrend, deptRank, exceptions } */
    async fetchDashboard() {
      await delay(400);
      return ok({ teamSummary: DB.teamSummary, weekTrend: DB.weekTrend, deptRank: DB.deptRank });
    },

    /** 规则列表 / 保存
     *  GET  /api/rules → rules[]
     *  POST /api/rules  { ...rule } */
    async fetchRules() { await delay(300); return ok(DB.rules); },
    async saveRule(rule) { await delay(650); return ok({ id: rule.id || "RULE-" + Date.now().toString().slice(-3) }); },

    /** 审批列表 / 通过 / 驳回（驳回必须带意见）
     *  GET  /api/approvals?status=pending|done
     *  POST /api/approvals/{id}/approve
     *  POST /api/approvals/{id}/reject { comment!必填 } */
    async fetchApprovals(status) {
      await delay(380);
      const list = status === "done" ? DB.approvals.filter(a => a.status !== "pending")
                                     : DB.approvals.filter(a => a.status === "pending");
      return ok(list);
    },
    async approve(id) { await delay(500); return ok({ id, status: "approved" }); },
    async reject(id, comment) {
      await delay(500);
      if (!comment || !comment.trim()) return { code: 400, msg: "驳回意见为必填项" };
      return ok({ id, status: "rejected" });
    },

    /** 提交补卡申请（服务端会二次校验必填）
     *  POST /api/applications/makeup { date!, period!, time!, reasonType!, reason!(10-200), photos?, cc? } */
    async submitMakeup(form) {
      await delay(700);
      const required = ["date", "period", "time", "reasonType", "reason"];
      const missing = required.filter(k => !form[k]);
      if (missing.length) return { code: 400, msg: "存在必填项未填写：" + missing.join(",") };
      if (form.reason.length < 10) return { code: 400, msg: "详细说明至少 10 个字" };
      return ok({ id: "AP-" + Date.now().toString().slice(-6), status: "pending" });
    },

    /** 提交请假申请
     *  POST /api/applications/leave { type!, start!, end!, reason!(10-200), photos?, cc? } */
    async submitLeave(form) {
      await delay(700);
      const required = ["type", "start", "end", "reason"];
      const missing = required.filter(k => !form[k]);
      if (missing.length) return { code: 400, msg: "存在必填项未填写：" + missing.join(",") };
      return ok({ id: "AP-" + Date.now().toString().slice(-6), status: "pending" });
    }
  };
})();

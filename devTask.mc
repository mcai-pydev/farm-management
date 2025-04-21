# Developer Task Review Board â€“ Phase 1 Launch

Welcome to the official development cycle for **NatureFarmManager Phase 1**.
This document serves as a task tracker, assignment log, and governance map for the initial round of developer contributions.

---

## í´ Governance Reminder
All development work must follow the **Human-in-the-Loop Governance Protocol**.
- âœ… Code must originate from an `ai-review/*` branch
- âœ… Only Mc Oforha may approve merges to `dev` or `main`
- âœ… All approved merges must include `/meta/push-approve.log`

---

## ï¿½ï¿½ Developer Tasks â€“ Phase 1 Code Review
| Task ID              | Title                          | Status   | Assigned To | Source Branch                  |
|----------------------|--------------------------------|----------|--------------|--------------------------------|
| sync_to_site_008     | Phase 1 File Sync              | âœ… Done  | AI Engineer  | ai-review/sync_to_site_008     |
| git_protocol_001     | Developer Onboarding           | âœ… Done  | AI Engineer  | ai-review/sync_to_site_008     |
| setup_phase1_001     | Bootstrap Dev Script           | âœ… Done  | AI Engineer  | ai-review/sync_to_site_008     |
| feature_task_001     | Dev: Farm Activity UI Planning | íµ’ Pending | Assigned Dev | dev/feature_task_001 (create from ai-review)

> âœ… Developers should start by running the bootstrap script:
```bash
bash bin/setup-local-phase1.sh
```

> Then branch off:
```bash
git checkout -b dev/your-task origin/ai-review/sync_to_site_008
```

All new features, fixes, and test modules must use the approved Git structure.

---

## íº€ Invitation Message (Copy & Send to Slack / Email)

```md
í¾‰ Welcome to the NatureFarmManager Developer Onboarding í¾‰

To get started:
1. Clone the repo:
   git clone git@github.com:mcai-pydev/farm-management.git
   cd farm-management

2. Use your approved SSH key:
   git config core.sshCommand "ssh -i ~/.ssh/farm_manager_key"

3. Run the bootstrap setup:
   chmod +x bin/setup-local-phase1.sh
   bash bin/setup-local-phase1.sh

4. Create your task branch:
   git checkout -b dev/your-task origin/ai-review/sync_to_site_008

You're now ready to code. íº€
See `/review/git_protocol_001/GIT_PROTOCOL.md` for full instructions.
```

---

Maintained by: `AI Engineer @ Mc Oforha`
Status: **Phase 1 Live & Open for Dev Cloning**


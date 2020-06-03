# データ構造

```uml
@startuml

entity "習慣(habits)" as e1 {
	id: int
	--
	習慣名(habit_name): string
	繰り返しタイプ(repeat_type): string
	繰り返し値(repeat_value): string
	開始日時(started_at): date
	目標時間(target_time): int
	時間帯(time_of_day): string
	作成日時(created_at): datetime
	更新日時(updated_at): datetime
}

entity "習慣記録(habit_records)" as e2 {
	id: int
	--
	習慣id(habit_id): int
	完了日時(completed_at): datetime
	スキップしたかどうか(is_skipped): boolean
	作成日時(created_at): datetime
	更新日時(updated_at): datetime
}

entity "作業記録(habit_sessions)" as e3 {
	id: int
	--
	習慣id(habit_id): int
	作業時間(working_minutes): int
	完了日時(completed_at): datetime
	作成日時(created_at): datetime
	更新日時(updated_at): datetime
}

entity "ユーザ(users)" as e5 {
	id: int
	--
	name: string
	email: string
	email_verified_at: datetime
	password: string
	remember_token: string
	created_at: datetime
	updated_at: datetime
}

e1 ||--o{ e2
e1 ||--o{ e3

package 未実装 {
	entity "リマインダー" as e4 {
		習慣id(habit_id): int
		時間: datetime
	}
}
@enduml
```
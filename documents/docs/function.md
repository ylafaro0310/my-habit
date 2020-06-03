# 機能仕様

```uml
@startuml
left to right direction

actor 利用者 as ac1

package システム {
    usecase 習慣を記録する as uc1
    usecase 作業時間を記録する as uc2
    usecase 習慣の連続記録が見られる as uc3
    usecase カレンダーで達成日を見られる as uc5
    usecase ログインできる as uc13

    package 未実装 {
        usecase 今週の成果が見られる as uc4
        usecase 習慣の達成率を見られる as uc6
        usecase 今日の達成度を見られる as uc7
        usecase 今週の達成度を見られる as uc8
        usecase チェックイン時間を見られる as uc9
        usecase 曜日ごとの成果を見られる as uc10
        usecase 習慣に使った時間を見られる as uc11
        usecase サブタスクを設定できる as uc12
    }
}

ac1 --> uc1
ac1 --> uc2
ac1 --> uc3
ac1 --> uc4
ac1 --> uc5
ac1 --> uc6
ac1 --> uc7
ac1 --> uc8
ac1 --> uc9
ac1 --> uc10
ac1 --> uc11
ac1 --> uc12
@enduml
```
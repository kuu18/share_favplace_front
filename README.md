# ShareFavplace

ShareFavplaceはお気に入りの場所を管理、シェアするアプリケーションです。 <br />
旅の思い出を残すアルバムのように使用したり、友達との旅行計画に使用するなど自由に使用できます。

1. 管理機能 <br />
今後行ってみたい場所や実際に行ってみて気に入った場所を登録し、管理することができます。
2. スケジュール機能 <br />
行ってみたい場所のスケジュールを登録することができます。
3. 共有機能 <br />
他のユーザーをフォローし、お気に入りの場所を共有することができます。
## アプリURL

https://sharefavplace.com <br />
バックエンド　[github](https://github.com/kuu18/share_favplace_api)
![](https://user-images.githubusercontent.com/64303128/217571306-56f1acd3-b020-4222-8439-c583bcc2718b.png)

## AWS構成図

![](https://user-images.githubusercontent.com/64303128/217569914-093ad9b9-61f0-44f5-9274-64df20dbc722.jpg)

## 機能一覧
**Favplace登録、管理機能**
- Favplace登録、編集、削除機能
- Favplace画像登録機能
- いいね機能
- コメント機能
- お気に入り（保存）機能
- Favplace検索機能

**スケジュール登録、管理機能**
- スケジュール登録、編集、削除機能

**ユーザー登録、管理機能**
- ユーザー登録、編集、削除機能
- プロフィール画像登録機能
- ユーザーフォロー機能
- メール認証機能
- ログイン、ログアウト機能
- ゲストログイン機能
- パスワードリセット機能
- ユーザー検索機能

**その他の機能**
- レスポンシブ対応(スマホ表示)
- ページネーション機能
- 無限スクロール機能
- 画像投稿時のプレビュー機能
- HTTPS通信(AWS Certificate Manager)

## 使用技術
**バックエンド**
- Java
- SpringBoot(RestApi)
- SpringDataJpa
- SpringSecurity
- maven
- lombok
- MapStruct

**フロントエンド**
- HTML/CSS
- TypeScript
- NuxtJS
- Vuetify
- nuxt-property-decorator
- vuex-module-decorators
- nuxt-i18n
- axios

**開発環境**
- Docker/Docker-compose
- Postgresql
- pgadmin4

**本番環境**
- AWS
  - VPC
  - ECS
  - Fargate
  - ECR
  - Route53
  - ALB
  - ACM
  - S3
  - IAM
- Postgresql(RDS)
- pgadmin4

**その他**
- Git
- VSCode
- JWT
- Json

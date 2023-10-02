# Запуск
`docker compose up`

Сервер запуститься на http://localhost:3000.

Swagger UI будет доступен по http://localhost:3000/documentation

# Library
The library API documentation

## Version: 1.0.0


### /users

#### GET
##### Summary:

Return all users

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 |  |

#### POST
##### Summary:

Create user

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |

##### Responses

| Code | Description |
| ---- | ----------- |
| 201 |  |

### /users/{id}

#### GET
##### Summary:

Return user by ID

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path |  | Yes | number |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 |  |

#### PUT
##### Summary:

Update user

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path |  | Yes | number |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 |  |

#### DELETE
##### Summary:

Delete user

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| id | path |  | Yes | number |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 |  |

### /subscriptions

#### GET
##### Summary:

Return all subscriptions

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 |  |

#### POST
##### Summary:

Create subscription

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |

##### Responses

| Code | Description |
| ---- | ----------- |
| 201 |  |

### /subscriptions/{subscriptionId}

#### GET
##### Summary:

Return subscription by ID

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| subscriptionId | path |  | Yes | number |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 |  |

### /subscriptions/{subscriptionId}/assignBook

#### POST
##### Summary:

Assign book to subscription

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| subscriptionId | path |  | Yes | number |

##### Responses

| Code | Description |
| ---- | ----------- |
| 201 |  |

### /subscriptions/{subscriptionId}/removeBook

#### DELETE
##### Summary:

Remove book from subscription

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| subscriptionId | path |  | Yes | number |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 |  |

### /books

#### GET
##### Summary:

Return all books

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |

##### Responses

| Code | Description |
| ---- | ----------- |
| 200 |  |

#### POST
##### Summary:

Create book

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |

##### Responses

| Code | Description |
| ---- | ----------- |
| 201 |  |

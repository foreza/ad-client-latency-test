# Distort

MVP Backend server for recording latency. (copied from Distort Provision)

*Problem*:

We don't have any feasible solution to record latency beyond manual measurement.
We need to record client latencies for ad requests for iOS, Android, and Windows clients.

*Solution*:

Backend server/DB to store all latency related data, be able to sort by platform and calculate an average latency.

## TODO

* WIP
* WIP
* WIP

## API DOCUMENTATION

*[PUBLIC] Add a new session*

**URL** : `/api/session`
**Method** : `POST`
**Content** : User will be provided a list of the sessions.

```json
{
    "TODO": 123
}
```

**Working example** 
All fields must be sent.

```json
{
    "broadcastUID": "123456"
}
```




*[PUBLIC] Show all recorded sessions (in raw JSON format)*

**URL** : `/api/session`
**Method** : `GET`
**Data constraints** : `{}`

## Success Responses

**Condition** : No sessions in the DB / sessions unavailable.
**Code** : `200 OK`
**Content** : `{[]}`

### OR

**Condition** : User can see 1 or more latency sessions.
**Code** : `200 OK`
**Content** : User will be provided a list of the sessions.

```json
{
    "TODO": 123
}
```

## Success Responses

**Condition** : No issue.
**Code** : `200 OK`
**Content** : `{[]}`


*[PUBLIC] Get a specific distort session information by ID (if present)*

**URL** : `/api/session`
**Method** : `GET`
**Data constraints** :
Provide the UID of the specific session to be retrieved.

```json
{
    "broadcastUID": "[]"
}
```

**Working example** 
All fields must be sent.

```json
{
    "broadcastUID": "123456"
}
```

## Success Responses

**Condition** : No matching session found.
**Code** : `200 OK`
**Content** : `{[]}`

### OR
**Condition** : Matching session was found.
**Code** : `200 OK`
**Content** : User will be provided with the information of that session.


```json
{
    "TODO": 123
}
```




*TODO: Update a new distort session*
**URL** : `/api/distort`
**Method** : `PUT`

*TODO: Delete a distort session*
**URL** : `/api/distort`
**Method** : `DELETE`

*TODO: Delete all distort sessions*
**URL** : `/api/distort`
**Method** : `DELETE`

# Migration Guide: from v0.x to v1.x

If you use faultline v0, Set `FAULTLINE_STAGE=v0`.

```sh
$ FAULTLINE_STAGE=v0 AWS_PROFILE=XXxxXXX npm run deploy
```

## Does the API schema change ?

API Document is [here](api.md) :book: .

| API Method | Request Schema | Response Schema |
| --- | --- | --- |
| GET | No | Yes |
| [POST](https://github.com/faultline/faultline/blob/master/docs/api.md#post-projectsprojecterrors) | No | Yes |
| PATCH | No | Yes |
| DELETE | No | Yes |
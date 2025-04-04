import { generateSeed } from './MysSRApi.js'
import crypto from 'crypto'
/**
 * derived from miao-yunzai
 */
export default class SRApiTool {
  /**
   *
   * @param {uid} uid
   * @param {server} server
   */
  constructor (uid, server) {
    this.uid = uid
    this.isSr = true
    this.server = server
    this.game = 'honkaisr'
    this.uuid = crypto.randomUUID()
  }

  getUrlMap = (data = {}) => {
    const productName = data?.productName ?? 'J9110'
    const deviceType = data?.deviceType ?? 'J9110'
    const modelName = data?.modelName ?? 'J9110'
    const oaid = data?.oaid ?? this.uuid
    const osVersion = data?.osVersion ?? '11'
    const deviceInfo = data?.deviceInfo ?? 'Sony/J9110/J9110:11/55.2.A.4.332/055002A004033203408384484:user/release-keys'
    const board = data?.board ?? 'msmnile'
    const deviceBrand = deviceInfo.split('/')[0]
    const deviceDisplay = deviceInfo.split('/')[3]
    let Bbs_api = 'https://bbs-api.miyoushe.com/'
    let host, hostRecord, hostPublicData
    if (['prod_gf_cn', 'prod_qd_cn'].includes(this.server)) {
      host = 'https://api-takumi.mihoyo.com/'
      hostRecord = 'https://api-takumi-record.mihoyo.com/'
      hostPublicData = 'https://public-data-api.mihoyo.com/'
    } else if (/official/.test(this.server)) {
      host = 'https://sg-public-api.hoyolab.com/'
      hostRecord = 'https://bbs-api-os.hoyolab.com/'
      hostPublicData = 'https://sg-public-data-api.hoyoverse.com/'
    }
    let urlMap = {
      honkaisr: {
        ...(['prod_gf_cn', 'prod_qd_cn'].includes(this.server) ? {
          srUser: {
            url: `${host}binding/api/getUserGameRolesByCookie`,
            query: `game_biz=hkrpg_cn&region=${this.server}&game_uid=${this.uid}`
          },
          getFp: {
            url: `${hostPublicData}device-fp/api/getFp`,
            body: {
              app_name: 'bbs_cn',
              bbs_device_id: `${this.uuid}`,
              device_fp: '38d7faa51d2b6',
              device_id: '35315696b7071100',
              ext_fields: `{"proxyStatus":1,"isRoot":0,"romCapacity":"512","deviceName":"${modelName}","productName":"${productName}","romRemain":"456","hostname":"BuildHost","screenSize":"1096x2434","isTablet":0,"aaid":"${this.uuid}","model":"${modelName}","brand":"${deviceBrand}","hardware":"qcom","deviceType":"${deviceType}","devId":"REL","serialNumber":"unknown","sdCapacity":107433,"buildTime":"1633631032000","buildUser":"BuildUser","simState":1,"ramRemain":"96757","appUpdateTimeDiff":1722171241616,"deviceInfo":"${deviceInfo}","vaid":"${this.uuid}","buildType":"user","sdkVersion":"30","ui_mode":"UI_MODE_TYPE_NORMAL","isMockLocation":0,"cpuType":"arm64-v8a","isAirMode":0,"ringMode":2,"chargeStatus":1,"manufacturer":"${deviceBrand}","emulatorStatus":0,"appMemory":"512","osVersion":"${osVersion}","vendor":"unknown","accelerometer":"-0.084346995x8.73799x4.6301117","sdRemain":96600,"buildTags":"release-keys","packageName":"com.mihoyo.hyperion","networkType":"WiFi","oaid":"${oaid}","debugStatus":1,"ramCapacity":"107433","magnetometer":"-13.9125x-17.8875x-5.4750004","display":"${deviceDisplay}","appInstallTimeDiff":1717065300325,"packageVersion":"2.20.2","gyroscope":"0.017714571x-4.5813544E-4x0.0015271181","batteryStatus":77,"hasKeyboard":0,"board":"${board}"}`,
              platform: '2',
              seed_id: `${this.uuid}`,
              seed_time: new Date().getTime() + ''
            },
            noDs: true
          },
          sign_info: {
            url: `${host}event/luna/info`,
            query: `lang=zh-cn&act_id=e202304121516551&region=${this.server}&uid=${this.uid}`
          }
        } : {
          srUser: {
            url: `${host}binding/api/getUserGameRolesByCookie`,
            query: `game_biz=hkrpg_global&region=${this.server}&game_uid=${this.uid}`
          },
          getFp: {
            url: `${hostPublicData}device-fp/api/getFp`,
            body: {
              app_name: 'bbs_oversea',
              device_fp: '38d7f2352506c',
              device_id: '35315696b7071100',
              ext_fields: `{"proxyStatus":1,"isRoot":0,"romCapacity":"512","deviceName":"${modelName}","productName":"${productName}","romRemain":"474","hostname":"BuildHost","screenSize":"1096x2434","isTablet":0,"model":"${modelName}","brand":"${deviceBrand}","hardware":"qcom","deviceType":"${deviceType}","devId":"REL","serialNumber":"unknown","sdCapacity":107433,"buildTime":"1633631032000","buildUser":"BuildUser","simState":1,"ramRemain":"96715","appUpdateTimeDiff":1722171191009,"deviceInfo":"${deviceInfo}","buildType":"user","sdkVersion":"30","ui_mode":"UI_MODE_TYPE_NORMAL","isMockLocation":0,"cpuType":"arm64-v8a","isAirMode":0,"ringMode":2,"app_set_id":"${this.uuid}","chargeStatus":1,"manufacturer":"${deviceBrand}","emulatorStatus":0,"appMemory":"512","adid":"${this.uuid}","osVersion":"${osVersion}","vendor":"unknown","accelerometer":"-0.22372891x-1.5332011x9.802497","sdRemain":96571,"buildTags":"release-keys","packageName":"com.mihoyo.hoyolab","networkType":"WiFi","debugStatus":1,"ramCapacity":"107433","magnetometer":"3.73125x-10.668751x3.7687502","display":"${deviceDisplay}","appInstallTimeDiff":1716489549794,"packageVersion":"2.20.2","gyroscope":"0.18386503x-0.006413896x-0.008857286","batteryStatus":77,"hasKeyboard":0,"board":"${board}"}`,
              hoyolab_device_id: `${this.uuid}`,
              platform: '2',
              seed_id: `${this.uuid}`,
              seed_time: new Date().getTime() + ''
            },
            noDs: true
          },
          sign_info: {
            url: `${host}event/luna/os/info`,
            query: 'lang=zh-cn&act_id=e202303301540311'
          }
        }),
        srCharacterDetail: {
          url: `${hostRecord}game_record/app/hkrpg/api/avatar/info`,
          query: `need_wiki=true&role_id=${this.uid}&server=${this.server}`
        },
        srCharacter: {
          url: `${hostRecord}game_record/app/hkrpg/api/avatar/basic`,
          query: `rolePageAccessNotAllowed=&role_id=${this.uid}&server=${this.server}`
        },
        srNote: {
          url: `${hostRecord}game_record/app/hkrpg/api/note`,
          query: `role_id=${this.uid}&server=${this.server}`
        },
        srCard: {
          url: `${hostRecord}game_record/app/hkrpg/api/index`,
          query: `role_id=${this.uid}&server=${this.server}`
        },
        srMonth: {
          url: `${host}event/srledger/month_info`,
          query: `lang=zh-cn&uid=${this.uid}&region=${this.server}&month=`
        },
        srChallenge: {
          url: `${hostRecord}game_record/app/hkrpg/api/challenge`,
          query: `isPrev=&need_all=true&role_id=${this.uid}&schedule_type=${data.schedule_type || '1'}&server=${this.server}`
        },
        srChallengeSimple: {
          url: `${hostRecord}game_record/app/hkrpg/api/challenge`,
          query: `role_id=${this.uid}&schedule_type=${data.schedule_type || '1'}&server=${this.server}`
        },
        srChallengeStory: {
          url: `${hostRecord}game_record/app/hkrpg/api/challenge_story`,
          query: `isPrev=&need_all=true&role_id=${this.uid}&schedule_type=${data.schedule_type || '1'}&server=${this.server}`
        }, // &type=story
        srChallengeStorySimple: {
          url: `${hostRecord}game_record/app/hkrpg/api/challenge_story`,
          query: `role_id=${this.uid}&schedule_type=${data.schedule_type || '1'}&server=${this.server}`
        },
        srChallengeBoss: {
          url: `${hostRecord}game_record/app/hkrpg/api/challenge_boss`,
          query: `isPrev=&need_all=true&role_id=${this.uid}&schedule_type=${data.schedule_type || '1'}&server=${this.server}`
        },
        srChallengeBossSimple: {
          url: `${hostRecord}game_record/app/hkrpg/api/challenge_boss`,
          query: `role_id=${this.uid}&schedule_type=${data.schedule_type || '1'}&server=${this.server}`
        },
        srRogue: {
          url: `${hostRecord}game_record/app/hkrpg/api/rogue`,
          query: `need_detail=true&role_id=${this.uid}&schedule_type=${data.schedule_type || '3'}&server=${this.server}`
        },
        srRogueLocust: {
          url: `${hostRecord}game_record/app/hkrpg/api/rogue_locust`,
          query: `need_detail=true&role_id=${this.uid}&server=${this.server}`
        },
        srPayAuthKey: {
          url: `${host}binding/api/genAuthKey`,
          body: {
            auth_appid: 'csc',
            game_biz: 'hkrpg_cn',
            game_uid: this.uid * 1,
            region: 'prod_gf_cn'
          },
          dsSalt: 'web'
        },
        deviceLogin: {
          url: `${Bbs_api}apihub/api/deviceLogin`,
          body: {
            app_version: '2.73.1',
            device_id: data.deviceId,
            device_name: `${deviceBrand}${modelName}`,
            os_version: '33',
            platform: 'Android',
            registration_id: generateSeed(19)
          }
        },
        saveDevice: {
          url: `${Bbs_api}apihub/api/deviceLogin`,
          body: {
            app_version: '2.73.1',
            device_id: data.deviceId,
            device_name: `${deviceBrand}${modelName}`,
            os_version: '33',
            platform: 'Android',
            registration_id: generateSeed(19)
          }
        }
      }
    }
    return urlMap[this.game]
  }
}

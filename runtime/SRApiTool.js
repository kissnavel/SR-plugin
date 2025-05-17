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
    const productName = data?.productName ?? 'XQ-AT52'
    const deviceType = data?.deviceType ?? 'XQ-AT52'
    const modelName = data?.modelName ?? 'XQ-AT52'
    const oaid = data?.oaid ?? this.uuid
    const osVersion = data?.osVersion ?? '12'
    const deviceInfo = data?.deviceInfo ?? 'Sony/XQ-AT52/XQ-AT52:12/58.2.A.7.93/058002A007009304241360111:user/release-keys'
    const board = data?.board ?? 'kona'
    const deviceBrand = deviceInfo.split('/')[0]
    const deviceDisplay = deviceInfo.split('/')[3]
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
              device_fp: '38d802d62e7fb',
              device_id: 'd927172613ac7594',
              ext_fields: `{"proxyStatus":1,"isRoot":0,"romCapacity":"512","deviceName":"${modelName}","productName":"${productName}","romRemain":"489","hostname":"BuildHost","screenSize":"1096x2434","isTablet":0,"aaid":"${this.uuid}","model":"${modelName}","brand":"${deviceBrand}","hardware":"qcom","deviceType":"${deviceType}","devId":"REL","serialNumber":"unknown","sdCapacity":228442,"buildTime":"1653304778000","buildUser":"BuildUser","simState":1,"ramRemain":"221267","appUpdateTimeDiff":1736258293874,"deviceInfo":"${deviceInfo}","vaid":"${this.uuid}","buildType":"user","sdkVersion":"31","ui_mode":"UI_MODE_TYPE_NORMAL","isMockLocation":0,"cpuType":"arm64-v8a","isAirMode":0,"ringMode":2,"chargeStatus":1,"manufacturer":"${deviceBrand}","emulatorStatus":0,"appMemory":"512","osVersion":"${osVersion}","vendor":"unknown","accelerometer":"0.24616162x0.44117668x9.934102","sdRemain":221125,"buildTags":"release-keys","packageName":"com.mihoyo.hyperion","networkType":"WiFi","oaid":"${oaid}","debugStatus":1,"ramCapacity":"228442","magnetometer":"-0.93750006x26.456251x-42.693752","display":"${deviceDisplay}","appInstallTimeDiff":1736258293874,"packageVersion":"2.33.0","gyroscope":"4.5813544E-4x-0.0x-7.635591E-4","batteryStatus":66,"hasKeyboard":0,"board":"${board}"}`,
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
              device_fp: '38d7f469c1319',
              device_id: 'd927172613ac7594',
              ext_fields: `{"proxyStatus":1,"isRoot":0,"romCapacity":"512","deviceName":"${modelName}","productName":"${productName}","romRemain":"474","hostname":"BuildHost","screenSize":"1096x2434","isTablet":0,"model":"${modelName}","brand":"${deviceBrand}","hardware":"qcom","deviceType":"${deviceType}","devId":"REL","serialNumber":"unknown","sdCapacity":228442,"buildTime":"1653304778000","buildUser":"BuildUser","simState":1,"ramRemain":"221344","appUpdateTimeDiff":1736258244054,"deviceInfo":"${deviceInfo}","buildType":"user","sdkVersion":"31","ui_mode":"UI_MODE_TYPE_NORMAL","isMockLocation":0,"cpuType":"arm64-v8a","isAirMode":0,"ringMode":2,"app_set_id":"${this.uuid}","chargeStatus":1,"manufacturer":"${deviceBrand}","emulatorStatus":0,"appMemory":"512","adid":"${this.uuid}","osVersion":"${osVersion}","vendor":"unknown","accelerometer":"-1.6262221x3.1136606x9.471091","sdRemain":221216,"buildTags":"release-keys","packageName":"com.mihoyo.hoyolab","networkType":"WiFi","debugStatus":1,"ramCapacity":"228442","magnetometer":"-17.1x-6.6937504x-25.85625","display":"${deviceDisplay}","appInstallTimeDiff":1736258244054,"packageVersion":"2.33.0","gyroscope":"-0.18203248x-0.3193204x0.060321167","batteryStatus":66,"hasKeyboard":0,"board":"${board}"}`,
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
        }
      }
    }
    return urlMap[this.game]
  }
}

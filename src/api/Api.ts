/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface AcceptParking {
  /** Accept */
  accept: boolean;
}

export interface Parking {
  /** Id parking */
  id_parking?: number;
  /**
   * Date of parking
   * @format date
   */
  date_of_parking?: string | null;
  /**
   * Status
   * @minLength 1
   * @maxLength 30
   */
  status?: string;
  /**
   * Created at
   * @format date-time
   */
  created_at?: string;
  /**
   * Formed at
   * @format date-time
   */
  formed_at?: string | null;
  /**
   * Ended at
   * @format date-time
   */
  ended_at?: string | null;
  /**
   * User name
   * @minLength 1
   */
  user_name?: string | null;
  /** Moderator */
  moderator?: number | null;
  /**
   * Port
   * @minLength 1
   * @maxLength 30
   */
  port?: string | null;
  /**
   * Spendings of crew
   * @min -2147483648
   * @max 2147483647
   */
  spendings_of_crew?: number | null;
}

export interface AuthToken {
  /**
   * Username
   * @minLength 1
   */
  username: string;
  /**
   * Password
   * @minLength 1
   */
  password: string;
}

export interface PutParking {
  /**
   * Date of parking
   * @format date
   */
  date_of_parking: string;
  /**
   * Port
   * @minLength 1
   */
  port: string;
  /**
   * Status
   * @minLength 1
   * @maxLength 30
   */
  status?: string;
  /**
   * Created at
   * @format date-time
   */
  created_at?: string;
  /**
   * Formed at
   * @format date-time
   */
  formed_at?: string | null;
  /**
   * Ended at
   * @format date-time
   */
  ended_at?: string | null;
  /**
   * User name
   * @minLength 1
   */
  user_name?: string | null;
  /** Moderator */
  moderator?: number | null;
  /**
   * Spendings of crew
   * @min -2147483648
   * @max 2147483647
   */
  spendings_of_crew?: number | null;
}

export interface UserUpdate {
  /**
   * Username
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   * @minLength 1
   * @maxLength 150
   * @pattern ^[\w.@+-]+$
   */
  username: string;
  /**
   * Email address
   * @format email
   * @maxLength 254
   */
  email?: string;
  /**
   * First name
   * @maxLength 150
   */
  first_name?: string;
  /**
   * Last name
   * @maxLength 150
   */
  last_name?: string;
}

export interface UserRegistration {
  /**
   * Username
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   * @minLength 1
   * @maxLength 150
   * @pattern ^[\w.@+-]+$
   */
  username: string;
  /**
   * Email address
   * @format email
   * @maxLength 254
   */
  email?: string;
  /**
   * Password
   * @minLength 1
   */
  password: string;
}

export interface ShipList {
  /** Id ship */
  id_ship?: number;
  /**
   * Ship name
   * @minLength 1
   * @maxLength 60
   */
  ship_name: string;
  /**
   * Description
   * @minLength 1
   * @maxLength 600
   */
  description: string;
  /**
   * Status
   * @minLength 1
   * @maxLength 30
   */
  status: string;
  /**
   * Class name
   * @minLength 1
   * @maxLength 60
   */
  class_name: string;
  /**
   * Img url
   * @minLength 1
   * @maxLength 255
   */
  img_url: string;
}

export interface ShipDetail {
  /** Id ship */
  id_ship?: number;
  /**
   * Ship name
   * @minLength 1
   * @maxLength 60
   */
  ship_name: string;
  /**
   * Class name
   * @minLength 1
   * @maxLength 60
   */
  class_name: string;
  /**
   * Status
   * @minLength 1
   * @maxLength 30
   */
  status: string;
  /**
   * Description
   * @minLength 1
   * @maxLength 600
   */
  description: string;
  /** Img url */
  img_url?: string;
}

export interface AddImage {
  /** Id ship */
  id_ship: number;
  /**
   * Img url
   * @minLength 1
   */
  img_url: string;
}

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "http://127.0.0.1:8000" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Snippets API
 * @version v1
 * @license BSD License
 * @termsOfService https://www.google.com/policies/terms/
 * @baseUrl http://127.0.0.1:8000
 * @contact <contact@snippets.local>
 *
 * Test description
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  addCaptain = {
    /**
     * @description Update the captain of a ship in a request.
     *
     * @tags add-captain
     * @name AddCaptainShipUpdate
     * @request PUT:/add-captain/{id_parking}/ship/{id_ship}/
     * @secure
     */
    addCaptainShipUpdate: (
      idParking: string,
      idShip: string,
      data: {
        /** Капитан корабля */
        captain: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/add-captain/${idParking}/ship/${idShip}/`,
        method: "PUT",
        body: data,
        secure: true,
        ...params,
      }),

    /**
     * @description Remove a threat from a request.
     *
     * @tags add-captain
     * @name AddCaptainShipDelete
     * @request DELETE:/add-captain/{id_parking}/ship/{id_ship}/
     * @secure
     */
    addCaptainShipDelete: (idParking: string, idShip: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/add-captain/${idParking}/ship/${idShip}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  deleteFromParking = {
    /**
     * @description Update the captain of a ship in a request.
     *
     * @tags delete-from-parking
     * @name DeleteFromParkingShipUpdate
     * @request PUT:/delete-from-parking/{id_parking}/ship/{id_ship}/
     * @secure
     */
    deleteFromParkingShipUpdate: (
      idParking: string,
      idShip: string,
      data: {
        /** Капитан корабля */
        captain: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/delete-from-parking/${idParking}/ship/${idShip}/`,
        method: "PUT",
        body: data,
        secure: true,
        ...params,
      }),

    /**
     * @description Remove a threat from a request.
     *
     * @tags delete-from-parking
     * @name DeleteFromParkingShipDelete
     * @request DELETE:/delete-from-parking/{id_parking}/ship/{id_ship}/
     * @secure
     */
    deleteFromParkingShipDelete: (idParking: string, idShip: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/delete-from-parking/${idParking}/ship/${idShip}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  deleteParking = {
    /**
     * @description Approve or decline a request (for moderators).
     *
     * @tags delete-parking
     * @name DeleteParkingUpdate
     * @request PUT:/delete-parking/{id_parking}/
     * @secure
     */
    deleteParkingUpdate: (idParking: string, data: AcceptParking, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/delete-parking/${idParking}/`,
        method: "PUT",
        body: data,
        secure: true,
        ...params,
      }),

    /**
     * @description Delete a request (for moderators).
     *
     * @tags delete-parking
     * @name DeleteParkingDelete
     * @request DELETE:/delete-parking/{id_parking}/
     * @secure
     */
    deleteParkingDelete: (idParking: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/delete-parking/${idParking}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  formParking = {
    /**
     * @description Mark a request as formed. Only available for requests with a 'draft' status.
     *
     * @tags form-parking
     * @name FormParkingUpdate
     * @request PUT:/form-parking/{id_parking}/
     * @secure
     */
    formParkingUpdate: (idParking: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/form-parking/${idParking}/`,
        method: "PUT",
        secure: true,
        ...params,
      }),
  };
  listParkings = {
    /**
     * @description Get a list of requests. Optionally filter by date and status.
     *
     * @tags list-parkings
     * @name ListParkingsList
     * @request GET:/list-parkings/
     * @secure
     */
    listParkingsList: (
      query?: {
        /**
         * Filter requests after a specific date
         * @format date
         */
        date?: string;
        /** Filter requests by status */
        status?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<Parking[], any>({
        path: `/list-parkings/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  login = {
    /**
     * @description Аутентификация пользователя с логином и паролем. Возвращает файл cookie сеанса в случае успеха.
     *
     * @tags login
     * @name LoginCreate
     * @request POST:/login/
     * @secure
     */
    loginCreate: (data: AuthToken, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/login/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
  logout = {
    /**
     * @description Выход аунтифицированного пользователя. Удаление сессии.
     *
     * @tags logout
     * @name LogoutCreate
     * @request POST:/logout/
     * @secure
     */
    logoutCreate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/logout/`,
        method: "POST",
        secure: true,
        ...params,
      }),
  };
  moderateParking = {
    /**
     * @description Approve or decline a request (for moderators).
     *
     * @tags moderate-parking
     * @name ModerateParkingUpdate
     * @request PUT:/moderate-parking/{id_parking}/
     * @secure
     */
    moderateParkingUpdate: (idParking: string, data: AcceptParking, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/moderate-parking/${idParking}/`,
        method: "PUT",
        body: data,
        secure: true,
        ...params,
      }),

    /**
     * @description Delete a request (for moderators).
     *
     * @tags moderate-parking
     * @name ModerateParkingDelete
     * @request DELETE:/moderate-parking/{id_parking}/
     * @secure
     */
    moderateParkingDelete: (idParking: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/moderate-parking/${idParking}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  parking = {
    /**
     * @description Get details of a request by ID, including associated threats.
     *
     * @tags parking
     * @name ParkingRead
     * @request GET:/parking/{id_parking}/
     * @secure
     */
    parkingRead: (idParking: string, params: RequestParams = {}) =>
      this.request<Parking, any>({
        path: `/parking/${idParking}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Update a request by ID.
     *
     * @tags parking
     * @name ParkingUpdate
     * @request PUT:/parking/{id_parking}/
     * @secure
     */
    parkingUpdate: (idParking: string, data: PutParking, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/parking/${idParking}/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
  profile = {
    /**
     * @description Обновление профиля аунтифицированного пользователя
     *
     * @tags profile
     * @name ProfileUpdate
     * @request PUT:/profile/
     * @secure
     */
    profileUpdate: (data: UserUpdate, params: RequestParams = {}) =>
      this.request<UserUpdate, void>({
        path: `/profile/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  register = {
    /**
     * @description Регистрация нового пользователя.
     *
     * @tags register
     * @name RegisterCreate
     * @request POST:/register/
     * @secure
     */
    registerCreate: (data: UserRegistration, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/register/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
  ships = {
    /**
     * @description Получение списка кораблей. Можно отфильтровать по его классу.
     *
     * @tags ships
     * @name ShipsList
     * @request GET:/ships/
     * @secure
     */
    shipsList: (
      query?: {
        /**
         * Название класса корабля
         * @default ""
         */
        class_name?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ShipList[], any>({
        path: `/ships/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Добавление корабля в заявку-черновик пользователя. Создается новая заявка, если не существует заявки-черновика
     *
     * @tags ships
     * @name ShipsAddCreate
     * @request POST:/ships/add/{id_ship}/
     * @secure
     */
    shipsAddCreate: (
      idShip: number,
      data: {
        /**
         * Капитан корабля
         * @example 10000
         */
        captain?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/ships/add/${idShip}/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Получить информацию о конкретном корабле.
     *
     * @tags ships
     * @name ShipsCreateList
     * @request GET:/ships/create/
     * @secure
     */
    shipsCreateList: (params: RequestParams = {}) =>
      this.request<ShipDetail, any>({
        path: `/ships/create/`,
        method: "GET",
        secure: true,
        type: ContentType.UrlEncoded,
        format: "json",
        ...params,
      }),

    /**
     * @description Добавление нового корабля (moderators only).
     *
     * @tags ships
     * @name ShipsCreateCreate
     * @request POST:/ships/create/
     * @secure
     */
    shipsCreateCreate: (
      data: {
        /**
         * @minLength 1
         * @maxLength 60
         */
        ship_name: string;
        /**
         * @minLength 1
         * @maxLength 60
         */
        class_name: string;
        /**
         * @minLength 1
         * @maxLength 30
         */
        status: string;
        /**
         * @minLength 1
         * @maxLength 600
         */
        description: string;
        img_url?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ShipDetail, void>({
        path: `/ships/create/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.UrlEncoded,
        format: "json",
        ...params,
      }),

    /**
     * @description Обновление данных корабля (moderators only).
     *
     * @tags ships
     * @name ShipsCreateUpdate
     * @request PUT:/ships/create/
     * @secure
     */
    shipsCreateUpdate: (
      data: {
        /**
         * @minLength 1
         * @maxLength 60
         */
        ship_name: string;
        /**
         * @minLength 1
         * @maxLength 60
         */
        class_name: string;
        /**
         * @minLength 1
         * @maxLength 30
         */
        status: string;
        /**
         * @minLength 1
         * @maxLength 600
         */
        description: string;
        img_url?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ShipDetail, void>({
        path: `/ships/create/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.UrlEncoded,
        format: "json",
        ...params,
      }),

    /**
     * @description Удаление корабля по ID (moderators only).
     *
     * @tags ships
     * @name ShipsCreateDelete
     * @request DELETE:/ships/create/
     * @secure
     */
    shipsCreateDelete: (params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/ships/create/`,
        method: "DELETE",
        secure: true,
        type: ContentType.UrlEncoded,
        ...params,
      }),

    /**
     * @description Получить информацию о конкретном корабле.
     *
     * @tags ships
     * @name ShipsDeleteRead
     * @request GET:/ships/delete/{id_ship}/
     * @secure
     */
    shipsDeleteRead: (idShip: string, params: RequestParams = {}) =>
      this.request<ShipDetail, any>({
        path: `/ships/delete/${idShip}/`,
        method: "GET",
        secure: true,
        type: ContentType.UrlEncoded,
        format: "json",
        ...params,
      }),

    /**
     * @description Добавление нового корабля (moderators only).
     *
     * @tags ships
     * @name ShipsDeleteCreate
     * @request POST:/ships/delete/{id_ship}/
     * @secure
     */
    shipsDeleteCreate: (
      idShip: string,
      data: {
        /**
         * @minLength 1
         * @maxLength 60
         */
        ship_name: string;
        /**
         * @minLength 1
         * @maxLength 60
         */
        class_name: string;
        /**
         * @minLength 1
         * @maxLength 30
         */
        status: string;
        /**
         * @minLength 1
         * @maxLength 600
         */
        description: string;
        img_url?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ShipDetail, void>({
        path: `/ships/delete/${idShip}/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.UrlEncoded,
        format: "json",
        ...params,
      }),

    /**
     * @description Обновление данных корабля (moderators only).
     *
     * @tags ships
     * @name ShipsDeleteUpdate
     * @request PUT:/ships/delete/{id_ship}/
     * @secure
     */
    shipsDeleteUpdate: (
      idShip: string,
      data: {
        /**
         * @minLength 1
         * @maxLength 60
         */
        ship_name: string;
        /**
         * @minLength 1
         * @maxLength 60
         */
        class_name: string;
        /**
         * @minLength 1
         * @maxLength 30
         */
        status: string;
        /**
         * @minLength 1
         * @maxLength 600
         */
        description: string;
        img_url?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ShipDetail, void>({
        path: `/ships/delete/${idShip}/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.UrlEncoded,
        format: "json",
        ...params,
      }),

    /**
     * @description Удаление корабля по ID (moderators only).
     *
     * @tags ships
     * @name ShipsDeleteDelete
     * @request DELETE:/ships/delete/{id_ship}/
     * @secure
     */
    shipsDeleteDelete: (idShip: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/ships/delete/${idShip}/`,
        method: "DELETE",
        secure: true,
        type: ContentType.UrlEncoded,
        ...params,
      }),

    /**
     * @description Upload an image for a ship.
     *
     * @tags ships
     * @name ShipsImageCreate
     * @request POST:/ships/image/
     * @secure
     */
    shipsImageCreate: (data: AddImage, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/ships/image/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Получить информацию о конкретном корабле.
     *
     * @tags ships
     * @name ShipsUpdateRead
     * @request GET:/ships/update/{id_ship}/
     * @secure
     */
    shipsUpdateRead: (idShip: string, params: RequestParams = {}) =>
      this.request<ShipDetail, any>({
        path: `/ships/update/${idShip}/`,
        method: "GET",
        secure: true,
        type: ContentType.UrlEncoded,
        format: "json",
        ...params,
      }),

    /**
     * @description Добавление нового корабля (moderators only).
     *
     * @tags ships
     * @name ShipsUpdateCreate
     * @request POST:/ships/update/{id_ship}/
     * @secure
     */
    shipsUpdateCreate: (
      idShip: string,
      data: {
        /**
         * @minLength 1
         * @maxLength 60
         */
        ship_name: string;
        /**
         * @minLength 1
         * @maxLength 60
         */
        class_name: string;
        /**
         * @minLength 1
         * @maxLength 30
         */
        status: string;
        /**
         * @minLength 1
         * @maxLength 600
         */
        description: string;
        img_url?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ShipDetail, void>({
        path: `/ships/update/${idShip}/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.UrlEncoded,
        format: "json",
        ...params,
      }),

    /**
     * @description Обновление данных корабля (moderators only).
     *
     * @tags ships
     * @name ShipsUpdateUpdate
     * @request PUT:/ships/update/{id_ship}/
     * @secure
     */
    shipsUpdateUpdate: (
      idShip: string,
      data: {
        /**
         * @minLength 1
         * @maxLength 60
         */
        ship_name: string;
        /**
         * @minLength 1
         * @maxLength 60
         */
        class_name: string;
        /**
         * @minLength 1
         * @maxLength 30
         */
        status: string;
        /**
         * @minLength 1
         * @maxLength 600
         */
        description: string;
        img_url?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ShipDetail, void>({
        path: `/ships/update/${idShip}/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.UrlEncoded,
        format: "json",
        ...params,
      }),

    /**
     * @description Удаление корабля по ID (moderators only).
     *
     * @tags ships
     * @name ShipsUpdateDelete
     * @request DELETE:/ships/update/{id_ship}/
     * @secure
     */
    shipsUpdateDelete: (idShip: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/ships/update/${idShip}/`,
        method: "DELETE",
        secure: true,
        type: ContentType.UrlEncoded,
        ...params,
      }),

    /**
     * @description Получить информацию о конкретном корабле.
     *
     * @tags ships
     * @name ShipsRead
     * @request GET:/ships/{id_ship}/
     * @secure
     */
    shipsRead: (idShip: string, params: RequestParams = {}) =>
      this.request<ShipDetail, any>({
        path: `/ships/${idShip}/`,
        method: "GET",
        secure: true,
        type: ContentType.UrlEncoded,
        format: "json",
        ...params,
      }),

    /**
     * @description Добавление нового корабля (moderators only).
     *
     * @tags ships
     * @name ShipsCreate
     * @request POST:/ships/{id_ship}/
     * @secure
     */
    shipsCreate: (
      idShip: string,
      data: {
        /**
         * @minLength 1
         * @maxLength 60
         */
        ship_name: string;
        /**
         * @minLength 1
         * @maxLength 60
         */
        class_name: string;
        /**
         * @minLength 1
         * @maxLength 30
         */
        status: string;
        /**
         * @minLength 1
         * @maxLength 600
         */
        description: string;
        img_url?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ShipDetail, void>({
        path: `/ships/${idShip}/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.UrlEncoded,
        format: "json",
        ...params,
      }),

    /**
     * @description Обновление данных корабля (moderators only).
     *
     * @tags ships
     * @name ShipsUpdate
     * @request PUT:/ships/{id_ship}/
     * @secure
     */
    shipsUpdate: (
      idShip: string,
      data: {
        /**
         * @minLength 1
         * @maxLength 60
         */
        ship_name: string;
        /**
         * @minLength 1
         * @maxLength 60
         */
        class_name: string;
        /**
         * @minLength 1
         * @maxLength 30
         */
        status: string;
        /**
         * @minLength 1
         * @maxLength 600
         */
        description: string;
        img_url?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ShipDetail, void>({
        path: `/ships/${idShip}/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.UrlEncoded,
        format: "json",
        ...params,
      }),

    /**
     * @description Удаление корабля по ID (moderators only).
     *
     * @tags ships
     * @name ShipsDelete
     * @request DELETE:/ships/{id_ship}/
     * @secure
     */
    shipsDelete: (idShip: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/ships/${idShip}/`,
        method: "DELETE",
        secure: true,
        type: ContentType.UrlEncoded,
        ...params,
      }),
  };
}

import type { Request, Response, NextFunction } from "express";
export declare const requireRole: (...allowedRoles: Array<"admin" | "user">) => (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=requireRole.d.ts.map
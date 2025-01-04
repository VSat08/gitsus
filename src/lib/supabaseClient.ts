// import { createClient, SupabaseClient } from "@supabase/supabase-js";

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// if (!supabaseUrl || !supabaseAnonKey) {
//   throw new Error("Missing Supabase environment variables");
// }

// const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

// export default supabase;

import { createClient } from "@supabase/supabase-js";

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error("Missing env.NEXT_PUBLIC_SUPABASE_URL");
}
if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error("Missing env.NEXT_PUBLIC_SUPABASE_ANON_KEY");
}

// Create Supabase client
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

export interface UploadProgress {
  progress: number;
  isComplete: boolean;
}

// export async function uploadFile(
//   file: File,
//   setProgress?: (progress: UploadProgress) => void,
// ): Promise<string> {
//   return new Promise(async (resolve, reject) => {
//     try {
//       // Create a unique file name to avoid collisions
//       const fileExt = file.name.split(".").pop();
//       const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
//       const filePath = `uploads/${fileName}`;

//       // For progress tracking
//       let uploadProgress = 0;
//       const totalChunks = Math.ceil(file.size / (1024 * 1024)); // 1MB chunks
//       let uploadedChunks = 0;

//       const { error: uploadError, data } = await supabase.storage
//         .from("uploads") // Create this bucket in your Supabase dashboard
//         .upload(filePath, file, {
//           cacheControl: "3600",
//           upsert: false,
//         });

//       if (uploadError) throw uploadError;

//       // Simulate progress since Supabase doesn't provide native progress
//       const progressInterval = setInterval(
//         () => {
//           uploadedChunks++;
//           uploadProgress = Math.min(95, (uploadedChunks / totalChunks) * 100);

//           if (setProgress) {
//             setProgress({
//               progress: Math.round(uploadProgress),
//               isComplete: false,
//             });
//           }

//           if (uploadProgress >= 95) {
//             clearInterval(progressInterval);
//           }
//         },
//         file.size / (totalChunks * 10),
//       ); // Adjust interval based on file size

//       const {
//         data: { publicUrl },
//       } = supabase.storage.from("uploads").getPublicUrl(filePath);

//       // Complete the progress
//       if (setProgress) {
//         setProgress({
//           progress: 100,
//           isComplete: true,
//         });
//       }

//       clearInterval(progressInterval);
//       resolve(publicUrl);
//     } catch (error) {
//       console.error("Error uploading file:", error);
//       reject(error);
//     }
//   });
// }

export async function uploadFile(
  file: File,
  setProgress?: (progress: UploadProgress) => void,
): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      let uploadProgress = 0;

      // Start progress update simulation
      const totalChunks = Math.ceil(file.size / (1024 * 1024)); // 1MB chunks
      let uploadedChunks = 0;
      const progressInterval = setInterval(() => {
        uploadedChunks++;
        uploadProgress = Math.min(
          95,
          Math.round((uploadedChunks / totalChunks) * 100),
        );

        if (setProgress) {
          setProgress({
            progress: uploadProgress,
            isComplete: false,
          });
        }

        if (uploadProgress >= 95) {
          clearInterval(progressInterval);
        }
      }, 500); // Adjust interval duration for smoother progress updates

      // Actual file upload
      const { error: uploadError, data } = await supabase.storage
        .from("uploads")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) throw uploadError;

      clearInterval(progressInterval);

      // Complete the progress
      if (setProgress) {
        setProgress({
          progress: 100,
          isComplete: true,
        });
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("uploads").getPublicUrl(filePath);

      resolve(publicUrl);
    } catch (error) {
      console.error("Error uploading file:", error);
      reject(error);
    }
  });
}

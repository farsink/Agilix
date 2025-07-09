import { Exercise2 } from "@/types/workout";

export const mapImages = (workout: Exercise2) => {
  const imageMap: { [key: string]: string } = {
    "Bench Press":
      "https://fitnessvolt.com/wp-content/uploads/2020/12/paused-bench-press.jpg",
    "Overhead Press":
      "https://media1.popsugar-assets.com/files/thumbor/EwyJG43jjmSz7jav4phYbRIl0X0/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2020/05/29/818/n/1922729/tmp_k0CDnI_305045276325591a_1-arm-shoulder-press.jpg",
    "Pull-ups":
      "https://assets.bwbx.io/images/users/iqjWHBFdfxIU/ir.Fx.JQ_WGU/v0/-1x-1.webp",
    "Dumbbell Rows":
      "https://weighttraining.guide/wp-content/uploads/2016/10/bent-over-one-arm-dumbbell-row-resized.png",
    "Bicep Curls":
      "https://www.inspireusafoundation.org/wp-content/uploads/2022/05/dumbbell-biceps-curl-1024x900.png",
    "Triceps Extensions":
      "https://thumbs.dreamstime.com/z/triceps-extension-overhead-exercise-studio-shot-over-white-58992715.jpg",
    "Running": "https://static2.bigstockphoto.com/5/3/9/large1500/93519371.jpg",
    "Cycling": "https://cdn.mos.cms.futurecdn.net/HDN8QqB4eYL5VVfEmHPXtk.jpg",
    "Squats":
      "https://media1.popsugar-assets.com/files/thumbor/gjJt0kpxglD2UG_QZXoNDrNpl6A/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2020/05/07/844/n/1922729/tmp_M4k29K_aac9fae8e4fe86be_Mastering-Basic-Squat.jpg",
    "Deadlifts":
      "https://weighttraining.guide/wp-content/uploads/2016/05/Barbell-Deadlift-1.png",
    "Push-ups":
      "https://imageio.forbes.com/specials-images/imageserve/65b57fae940a535b367664ea/0x0.jpg?format=jpg&height=900&width=1600&fit=bounds",
    "Kettlebell Swings":
      "https://www.shape.com/thmb/rQ3-AU_iHo7UqNVonoGh4ljKCY0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/kettlebell-swing-workout-5275a3caf4934631819effe8b95a962a.jpg",
    "Burpees":
      "https://www.lavidalucida.com/wp-content/uploads/2021/09/como-hacer-burpees_opt.jpg",
    "Sprints":
      "https://media4.popsugar-assets.com/files/thumbor/nNkEdACmQIX0FCUNx8CNoM50fbI/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2014/09/12/936/n/1922729/9951fd268d532557_456125599.jpg",
    "Rowing Machine":
      "https://static01.nyt.com/images/2022/11/08/multimedia/26WNT-ROWING-WORKOUT5-1-310a/26WNT-ROWING-WORKOUT5-1-310a-videoSixteenByNine3000.jpg",
    "Barbell Squats":
      "https://weighttraining.guide/wp-content/uploads/2016/10/barbell-squat-resized-FIXED-2.png",
    "Romanian Deadlifts":
      "https://weighttraining.guide/wp-content/uploads/2016/10/Barbell-Romanian-Deadlift.png",
    "Lunges":
      "https://www.wsj.com/buyside/wellness/fitness/best-home-gym-equipment",
    "Calf Raises":
      "https://www.verywellfit.com/thmb/hmWp9vD7rhPBA5uG6XSpdE6FRuU=/3000x2000/filters:no_upscale():max_bytes(150000):strip_icc()/33-Standing-Calf-Raises-GIF-72bfdb353f2d4d439f4510bd02f16568.gif",
    "Yoga": "https://calgarypilates.com/wp-content/uploads/2016/05/What-is-Pilates-1.jpg",
    "Walking":
      "https://i.pinimg.com/736x/f2/a8/96/f2a89605df1d57d6226a2b75080e979f.jpg",
    "Incline Bench Press":
      "https://www.athleticinsight.com/wp-content/uploads/2022/09/Incline-Bench-Press-06.jpg",
    "Arnold Press":
      "https://i.pinimg.com/originals/69/bc/1a/69bc1aa8abe2e0434a0bc2401cba5821.png",
    "Chin-ups":
      "https://assets.bwbx.io/images/users/iqjWHBFdfxIU/ir.Fx.JQ_WGU/v0/-1x-1.webp",
    "Hammer Curls":
      "https://i.pinimg.com/originals/69/bc/1a/69bc1aa8abe2e0434a0bc2401cba5821.png",
    "Overhead Triceps Extensions":
      "https://weighttraining.guide/wp-content/uploads/2017/08/seated-dumbbell-overhead-triceps-extension-resized.png",
    "Goblet Squats":
      "https://www.nj.com/resizer/L9Xyaxw4TIjEMBUEZpe8bYwnjBo=/1280x0/smart/advancelocal-adapter-image-uploads.s3.amazonaws.com/image.nj.com/home/njo-media/width2048/img/fitness/photo/goblet-squat-sei9iu-promo--squarejpg-c33fe3c33b15495f.jpg",
    "Mountain Climbers":
      "https://www.verywellfit.com/thmb/DUJZwu-5jwFPF_30xe75Se2RIJ0=/4018x2679/filters:fill(FFDB5D,1)/4-MountainClimb-56fac9f65f9b582986736c50.jpg",
    "Russian Twists":
      "https://media1.popsugar-assets.com/files/thumbor/nT7nNaL82QUSiP7rvZg68oA-FlQ/fit-in/1024x1024/filters:format_auto-!!-:strip_icc-!!-/2014/05/27/958/n/1922729/e1cb378aa7c6a633_MountainClimbers/i/Mountain-Climbers.jpg",
    "Decline Push-ups":
      "https://imageio.forbes.com/specials-images/imageserve/65b57fae940a535b367664ea/0x0.jpg?format=jpg&height=900&width=1600&fit=bounds",
    "Hill Sprints":
      "https://i0.wp.com/marathonhandbook.com/wp-content/uploads/2020/07/hill-sprints-2.jpg?resize=724,455&ssl=1",
    "Elliptical": "https://i.imgur.com/CyTGb1N.jpg",
  };

  return imageMap[workout.name] || "https://example.com/default.jpg";
};

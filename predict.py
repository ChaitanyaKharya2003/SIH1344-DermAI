# import sys
# import tensorflow as tf
# import numpy as np
# import matplotlib.pyplot as plt
# import keras
# from keras.preprocessing.image import ImageDataGenerator,img_to_array,load_img
# from keras.applications.vgg19 import preprocess_input

# import sys
 
# def print_to_stdout(*a):
#     print(*a, file=sys.stdout)

# # Load your machine learning model here
# model = tf.keras.models.load_model('./dermena_model.h5')

# # Define disease labels
# disease_labels = ["Actinic Keratosis", "Atopic Dermatitis", "Benign Keratosis", "Dermatofibroma", "Melanoma", "Melanocytic nevus", "Squamous cell carcinoma", "Tinea Ringworm Candidiasis", "Vascular Lesions"]
# # Read the image data from stdin
# train_datagen=ImageDataGenerator(zoom_range=0.5,shear_range=0.3,horizontal_flip=True,preprocessing_function=preprocess_input)
# train=train_datagen.flow_from_directory(directory="../ImgClassifier/Data/train",target_size=(256,256),batch_size=32)
# # image_data = sys.stdin.buffer.read()
# ref=dict(zip(list(train.class_indices.values()),list(train.class_indices.keys())))
# def prediction(image_path):
#      img=load_img(image_path,target_size=(256,256))
#     #  img = sys.stdin.buffer.read()
#      i=img_to_array(img)
#      im=preprocess_input(i)
#      img=np.expand_dims(im,axis=0)
#      pred=np.argmax(model.predict(img))
#      ref[pred]=ref[pred][0:-7]
#      print(f"{ref[pred]}")
#     #  plt.imshow(i.astype(int))
#     #  plt.axis('off')
#     #  plt.show()
# print_to_stdout(prediction("./public/uploads/actinic-keratosis-5FU-10.jpg"))

import sys
import tensorflow as tf
import numpy as np
import keras
from keras.preprocessing.image import ImageDataGenerator, img_to_array, load_img
from keras.applications.vgg19 import preprocess_input

# Load your machine learning model here
model = tf.keras.models.load_model('./dermena_model.h5')

# Define disease labels
disease_labels = [
    "Actinic Keratosis", "Atopic Dermatitis", "Benign Keratosis",
    "Dermatofibroma", "Melanoma", "Melanocytic Nevus",
    "Squamous Cell Carcinoma", "Tinea Ringworm Candidiasis",
    "Vascular Lesions"
]

def prediction(image_path):
    img = load_img(image_path, target_size=(256, 256))
    i = img_to_array(img)
    im = preprocess_input(i)
    img = np.expand_dims(im, axis=0)
    pred = np.argmax(model.predict(img))
    predicted_disease = disease_labels[pred]
    return predicted_disease

if __name__ == "__main__":
    # if len(sys.argv) != 2:
    #     print("Usage: python predict.py <image_path>")
    #     print("hi",sys.stdin.buffer.read())
    #     sys.exit(1)

    image_path = sys.stdin.buffer.read()
    predicted_disease = prediction(image_path)
    print(predicted_disease)
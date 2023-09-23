import sys
import tensorflow as tf
import numpy as np
import pickle
import json

# Load your machine learning model here
pickled_model = pickle.load(open('../finalized_model.pkl', 'rb'))


# Loading the json file with the skin disorders
def get_treatment(path):
    with open(path) as f:
        return json.load(f)
treatment_dict = get_treatment("skin_disorder.json")

# function to check if the file is an allowed image type
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in {'png', 'jpg', 'jpeg'}
# Define disease labels
disease_labels = ["Acne", "Basal cell carcinoma", "Benign Keratosis-like Lesions (BKL)", "Atopic dermatitis(Eczema)",
               "Actinic keratosis(AK)", "Melanoma", "Psoriasis","Tinea(Ringworm)"]

# Read the image data from stdin
image_data = sys.stdin.buffer.read()

# Preprocess the image (replace with your actual preprocessing code)
# Example: image_data = preprocess_image(image_data)

# Make predictions
predictions = pickled_model.predict(np.expand_dims(image_data, axis=0))
predicted_class = np.argmax(predictions[0])
predicted_disease = disease_labels[predicted_class]
treatments = treatment_dict.get(predicted_disease, [])
# Print the predicted disease to stdout
print("{predicted_disease},,{treatments}".format(predicted_disease=predicted_disease, treatments=treatments))
